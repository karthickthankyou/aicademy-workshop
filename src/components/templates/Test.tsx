'use client'
import { useFormTest } from '@/forms/test'
import { trpcClient } from '@/trpc/clients/client'
import { RouterOutputs } from '@/trpc/clients/types'
import { Label } from '../atoms/label'
import { TextArea } from '../atoms/textArea'
import { Button } from '../atoms/button'
import { useToast } from '../molecules/Toaster/use-toast'
import { useRouter } from 'next/navigation'
import { revalidatePath } from '@/util/actions'

export const Test = ({
  testId,
  questions,
}: {
  testId: number
  questions: RouterOutputs['tests']['createTest']['TestQuestions']
}) => {
  const { register, handleSubmit, reset } = useFormTest({
    defaultValues: {
      testId,
      answers: questions.map(({ Question: { id, question } }) => ({
        id,
        question,
        userAnswer: null,
      })),
    },
  })
  const router = useRouter()

  const { toast } = useToast()

  const { mutateAsync: submitTest, isLoading } =
    trpcClient.tests.submitTest.useMutation({
      onSuccess() {
        toast({ title: 'Submitted successfully.' })
        reset()
        revalidatePath('/student/tests')
        router.replace('/student/tests')
      },
      onError() {
        toast({ title: 'Submission failed.' })
      },
    })

  return (
    <form
      onSubmit={handleSubmit(async ({ answers, testId }) => {
        await submitTest({ answers, testId })
      })}
    >
      {questions.map((question, index) => (
        <Label key={question.id} title={question.Question.question}>
          <TextArea
            {...register(`answers.${index}.userAnswer`)}
            placeholder="Your answer"
            rows={6}
          />
        </Label>
      ))}
      <Button type="submit" loading={isLoading}>
        Submit Answers
      </Button>
    </form>
  )
}
