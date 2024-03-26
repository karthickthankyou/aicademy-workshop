import { RouterOutputs } from '@/trpc/clients/types'
import Link from 'next/link'
import { DisplayDate } from '../molecules/DisplayDate'

export const ConversationCard = ({
  conversation,
}: {
  conversation: RouterOutputs['students']['myConversations'][0]
}) => {
  const courseId = conversation.Chapter.Course.id
  const chapterId = conversation.Chapter.id
  return (
    <Link
      href={`/course/${courseId}/chapter/${chapterId}#conversation`}
      key={conversation.id}
      scroll
    >
      <div className="font-semibold">{conversation.Chapter.title}</div>
      <div className="text-sm">{conversation.Chapter.Course.title}</div>
      <DisplayDate dateString={conversation.updatedAt} />
    </Link>
  )
}
