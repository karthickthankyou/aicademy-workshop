import { AlertBox } from '@/components/molecules/AlertBox'
import { CoursePage } from '@/components/templates/CoursePage'
import { trpcServer } from '@/trpc/clients/server'

export default async function Page({ params }: { params: { id: string } }) {
  const courseId = +params.id

  const course = await trpcServer.courses.course.query({ id: courseId })

  if (!course) {
    return <AlertBox>Course not found.</AlertBox>
  }

  return <CoursePage course={course} />
}
