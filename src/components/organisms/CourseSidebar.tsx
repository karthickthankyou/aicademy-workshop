import { cn } from '@/util/styles'
import { buttonVariants } from '@/util/styles/variants'
import { Link } from '../molecules/CustomLink'
import { RouterOutputs } from '@/trpc/clients/types'
import { CourseType } from '../templates/CoursePage'

export const CourseSidebar = ({ course }: { course: CourseType }) => {
  return (
    <div className="w-full max-w-lg py-4">
      <Link href={`/course/${course.id}`}>
        <h1 className={cn('text-xl')}>{course.title}</h1>
      </Link>

      <h2 className="mt-4 mb-2 font-semibold">Chapters</h2>
      <ul className="space-y-1">
        {course.Chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <Link href={`/course/${course.id}/chapter/${chapter.id}`}>
              {index + 1}. {chapter.title}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={`/test/${course.id}`}
        className={cn(
          buttonVariants({ variant: 'default' }),
          'inline-block mt-4 ',
        )}
      >
        Take test
      </Link>
    </div>
  )
}
