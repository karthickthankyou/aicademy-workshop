import { Title } from '@/components/atoms/typography'
import { AlertBox } from '@/components/molecules/AlertBox'
import { AIConversations } from '@/components/organisms/AIConversation'
import { trpcServer } from '@/trpc/clients/server'
import Link from 'next/link'

export default async function Page({
  params,
}: {
  params: { chapterId: string }
}) {
  const chapterId = +params.chapterId

  const chapter = await trpcServer.chapters.chapter.query({
    id: chapterId,
  })

  if (!chapter) {
    return <AlertBox>No chapter found.</AlertBox>
  }

  const myCreditBalance = await trpcServer.creditBalance.myCreditBalance.query()

  return (
    <div>
      <Title>{chapter.title}</Title>
      <div className="max-w-lg whitespace-pre-wrap mt-6">{chapter.content}</div>
      {myCreditBalance?.balance || 0 > 0 ? (
        <AIConversations
          chapter={chapter}
          className="mt-6"
          credits={myCreditBalance?.balance || 0}
        />
      ) : (
        <Link
          className="inline-block mt-12 underline underline-offset-8"
          href={'/student/credits'}
        >
          Add AI credits to continue.
        </Link>
      )}
    </div>
  )
}
