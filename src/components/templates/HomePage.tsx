import { trpcServer } from '@/trpc/clients/server'
import { AlertBox } from '../molecules/AlertBox'
import { CourseCard } from '../organisms/CourseCard'

export const HomePage = async () => {
  const courses = await trpcServer.courses.courses.query()

  if (!courses.length) {
    return <AlertBox>No courses found.</AlertBox>
  }

  return (
    <div className="grid grid-cols-4 gap-3">
      {courses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </div>
  )
}
