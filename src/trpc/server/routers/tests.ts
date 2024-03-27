import { formSchemaID, schemaSubmitTest } from '@/forms/schemas'
import { createTRPCRouter, protectedProcedure } from '..'
import { Question } from '@prisma/client'
import { QUESTION_PER_TEST } from '@/util/constants'

export const testRoutes = createTRPCRouter({
  tests: protectedProcedure('admin').query(async ({ ctx }) => {
    return ctx.db.test.findMany()
  }),
  myTests: protectedProcedure().query(async ({ ctx }) => {
    return ctx.db.test.findMany({
      where: { studentUid: { equals: ctx.userId } },
      include: { TestQuestions: { include: { Question: true } }, Course: true },
    })
  }),
  createTest: protectedProcedure()
    .input(formSchemaID)
    .mutation(async ({ ctx, input }) => {
      const { id } = input
      const studentUid = ctx.userId

      const student = await ctx.db.student.findUnique({
        where: { id: studentUid },
      })

      if (!student) {
        await ctx.db.student.create({ data: { id: studentUid } })
      }

      const existingTest = await ctx.db.test.findFirst({
        where: {
          courseId: id,
          studentUid,
          aiTotalScore: { equals: null },
        },
        include: {
          Course: true,
          TestQuestions: { include: { Question: true } },
        },
      })

      if (existingTest) {
        return existingTest
      }

      const questions = (await ctx.db
        .$queryRaw`SELECT * FROM "Question" WHERE "chapterId" IN (SELECT id FROM "Chapter" WHERE "courseId" = ${id}) ORDER BY RANDOM() LIMIT ${QUESTION_PER_TEST}`) as Question[]

      return ctx.db.test.create({
        data: {
          studentUid,
          courseId: id,
          TestQuestions: {
            create: questions.map(({ id }) => ({
              questionId: id,
              studentAnswer: '',
            })),
          },
        },
        include: {
          Course: true,
          TestQuestions: { include: { Question: true } },
        },
      })
    }),
  submitTest: protectedProcedure()
    .input(schemaSubmitTest)
    .mutation(async ({ ctx, input }) => {
      const questionIds = input.answers.map((que) => que.id)
      const correctAnswers = await ctx.db.answer.findMany({
        where: { questionId: { in: questionIds } },
      })

      const answers = input.answers.map((userAnswer) => {
        const correctAnswer = correctAnswers.find(
          (answer) => answer.questionId === userAnswer.id,
        )

        return {
          userAnswer: userAnswer.userAnswer,
          correctAnswer: correctAnswer?.answer || '',
          question: userAnswer.question,
          questionId: userAnswer.id,
        }
      })

      const aiResults = await ctx.ai.submitTest({
        answers,
        studentUid: ctx.userId,
      })

      await Promise.all(
        aiResults.map((result) => {
          return ctx.db.testQuestion.updateMany({
            where: {
              testId: input.testId,
              questionId: +result.questionId,
            },
            data: {
              aiScore: result.marks,
              aiFeedback: result.feedback,
              studentAnswer:
                input.answers.find((que) => que.id === +result.questionId)
                  ?.userAnswer || '',
            },
          })
        }),
      )
      const totalMarks = aiResults.reduce((total, res) => total + res.marks, 0)

      await ctx.db.test.update({
        data: {
          aiTotalScore: totalMarks,
        },
        where: {
          id: input.testId,
        },
      })

      return aiResults
    }),
})
