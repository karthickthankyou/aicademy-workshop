import { RouterOutputs } from '@/trpc/clients/types'
import { cn } from '@/util/styles'
import Link from 'next/link'
import { DisplayDate } from '../molecules/DisplayDate'
import { Badge } from '../atoms/badge'
import Image from 'next/image'

export interface ICourseCardSimpleProps {
  course: RouterOutputs['courses']['courses'][0]
}

export const CourseCardSimple = ({ course }: ICourseCardSimpleProps) => {
  return (
    <Link
      href={`/course/${course.id}`}
      className={!course.published ? 'text-gray-400' : ' bg-gray-100'}
    >
      <Image
        alt=""
        width={500}
        height={500}
        src={course.image || '/user.jpg'}
        className="object-cover aspect-square rounded"
      />
      <div className={cn('mt-2 font-medium')}>{course.title}</div>

      <DisplayDate dateString={course.createdAt} className="mt-2" />
      <Badge variant={'secondary'}>
        {course.published ? 'published' : 'unpublished'}
      </Badge>
    </Link>
  )
}
