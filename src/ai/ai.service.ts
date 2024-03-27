import OpenAI from 'openai'
import { getModelName } from '@/util'
import { prisma } from '@/db'
import { AIModel } from '@prisma/client'
import { EXAM_MODEL, MARKS_PER_QUESTION, MODEL_COSTS } from './constants'

type ChatCompletionMessageParam = {
  content: string
  role: 'system' | 'user'
}

export class AIService {
  private readonly openAI: OpenAI

  constructor() {
    this.openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }

  async doubt({
    chapterId,
    doubt,
    studentUid,
    conversationId,
    model,
  }: {
    doubt: string
    chapterId: number
    studentUid: string
    conversationId: number
    model: AIModel
  }) {
    const messages: ChatCompletionMessageParam[] = []

    messages.push({
      content:
        'You are a teacher. Clarify the doubt of the user concisely. If the doubt is irrelevant to the chapter, Let the student know.',
      role: 'system',
    })

    const { chapter, result } = await this.concatenateCourseInfo(chapterId)

    messages.push({
      content: result,
      role: 'system',
    })

    const allMessages = await prisma.message.findMany({
      where: { conversationId },
    })

    allMessages.forEach((message) =>
      messages.push({
        content: message.content.substring(0, 100),
        role: message.sender === 'AI' ? 'system' : 'user',
      }),
    )

    const chatCompletion = await this.openAI.chat.completions.create({
      messages,
      model: getModelName(model),
      max_tokens: 200,
    })

    const answer = chatCompletion.choices
      .map((choice) => choice.message.content)
      .join(' ')

    const addAiAnswer = await prisma.message.create({
      data: {
        sender: 'AI',
        content: answer,
        conversationId: conversationId,
        model,
      },
    })
    // Add transaction

    const promptTokens = chatCompletion.usage?.prompt_tokens || 0
    const completionTokens = chatCompletion.usage?.completion_tokens || 0

    await this.addTransaction({
      promptTokens,
      completionTokens,
      model,
      studentUid,
      notes: `Conversation: Chapter "${chapter?.title}" in "${chapter?.Course.title}".`,
    })
    return addAiAnswer
  }

  async submitTest({
    answers,
    studentUid,
  }: {
    answers: {
      userAnswer?: string | null
      correctAnswer: string
      question: string
      questionId: number
    }[]
    studentUid: string
  }): Promise<{ questionId: string; feedback: string; marks: number }[]> {
    const messages: ChatCompletionMessageParam[] = []

    messages.push({
      role: 'system',
      content:
        'You are a teacher. Look at the user answers and give them marks and feedbacks for their answers.',
    })

    answers.forEach((answer, index) => {
      messages.push({
        role: 'system',
        content: `QuestionId: ${answer.questionId}, Question: ${answer.question}`,
      })
      messages.push({
        role: 'user',
        content: `User Answer: ${answer.userAnswer}`,
      })
      messages.push({
        role: 'system',
        content: `Correct Answer: ${answer.correctAnswer}`,
      })
    })
    messages.push({
      role: 'system',
      content: `Make sure the marks are between a range 0 to ${MARKS_PER_QUESTION} based on correctness of the answer. Completely wrong answers should receive scores much closer to 0.`,
    })

    const response = await this.openAI.chat.completions.create({
      messages,
      max_tokens: 400,
      model: getModelName(EXAM_MODEL),
      tools: [
        {
          type: 'function',
          function: {
            name: 'get_student_result',
            description: 'Get the student exam result.',
            parameters: {
              type: 'object',
              properties: {
                testResults: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      questionId: {
                        type: 'number',
                        description: 'The unique id of the question.',
                      },
                      feedback: {
                        type: 'string',
                        description: 'Feedback given on the students answer.',
                      },
                      marks: {
                        type: 'number',
                        description: `Marks given for the answer. Minimum:0 Maximum:${MARKS_PER_QUESTION}`,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      ],
    })
    const responseMessage = response.choices[0].message

    const promptTokens = response.usage?.prompt_tokens || 0
    const completionTokens = response.usage?.completion_tokens || 0
    await this.addTransaction({
      promptTokens,
      completionTokens,
      model: EXAM_MODEL,
      studentUid,
      notes: `Test`,
    })

    const result = JSON.parse(
      responseMessage.tool_calls?.[0].function.arguments || '',
    )

    console.log('result', result)
    return result.testResults
  }

  // Utils
  async concatenateCourseInfo(chapterId: number) {
    const chapter = await prisma.chapter.findUnique({
      where: { id: chapterId },
      include: { Course: true },
    })
    let result = `Course Title:${chapter?.Course.title}\nCourse Description:${
      chapter?.Course.description || ''
    }\n`

    result += `\nChapter Title: ${chapter?.title}\nContent: ${chapter?.content}\n`

    return { result, chapter }
  }

  async addTransaction({
    promptTokens,
    completionTokens,
    model,
    studentUid,
    notes,
  }: {
    promptTokens: number
    completionTokens: number
    model: AIModel
    studentUid: string
    notes?: string
  }) {
    const COST = MODEL_COSTS[model]

    const usage =
      (promptTokens * COST.promptTokenCost) / 1_000 +
      (completionTokens * COST.completionTokenCost) / 1_000

    await prisma.creditBalance.upsert({
      where: { userId: studentUid },
      create: {
        balance: -usage,
        userId: studentUid,
        Transactions: {
          create: {
            amount: -usage,
            promptTokens,
            completionTokens,
            userId: studentUid,
            model,
            notes,
          },
        },
      },
      update: {
        balance: { decrement: usage },
        Transactions: {
          create: {
            amount: -usage,
            promptTokens,
            completionTokens,
            userId: studentUid,
            model,
            notes,
          },
        },
      },
    })
  }
}
