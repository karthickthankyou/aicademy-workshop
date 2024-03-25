import { Title2 } from '@/components/atoms/typography'
import { CourseCardSimple } from '@/components/organisms/CourseCardSimple'
import { trpcServer } from '@/trpc/clients/server'

export default async function Page() {
  const courses = await trpcServer.courses.courses.query()
  return (
    <div>
      <Title2>Courses</Title2>

      <div className="grid grid-cols-3 gap-3">
        {courses?.map((course) => (
          <CourseCardSimple key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
