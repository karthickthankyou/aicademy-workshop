import { AlertBox } from '@/components/molecules/AlertBox'
import { ConversationCard } from '@/components/organisms/ConversationCard'
import { trpcServer } from '@/trpc/clients/server'

export default async function Page() {
  const myConversations = await trpcServer.students.myConversations.query()

  if (!myConversations.length) {
    return <AlertBox>No conversations found.</AlertBox>
  }

  return (
    <div className="flex flex-col gap-4">
      {myConversations.map((conversation) => (
        <ConversationCard key={conversation.id} conversation={conversation} />
      ))}
    </div>
  )
}
