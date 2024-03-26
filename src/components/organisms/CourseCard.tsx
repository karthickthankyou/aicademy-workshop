import Link from 'next/link'
import Image from 'next/image'
import { RouterOutputs } from '@/trpc/clients/types'
import { cn } from '@/util/styles'

export const CourseCard = ({
  course,
}: {
  course: RouterOutputs['courses']['courses'][0]
}) => {
  return (
    <div>
      <Link href={`/course/${course.id}`}>
        <Image
          src={course.image || '/book.jpg'}
          alt=""
          className="object-cover w-full rounded shadow-lg aspect-square"
          width={300}
          height={300}
        />
        <div
          className={cn(
            'font-medium hover:underline mt-2 line-clamp-2 max-w-lg underline-offset-4 ',
          )}
        >
          {course.title}
        </div>
      </Link>
      <div className="max-w-md mt-1 text-sm gray-500 line-clamp-2">
        {course.Chapters?.length || 0} chapters
      </div>
    </div>
  )
}
