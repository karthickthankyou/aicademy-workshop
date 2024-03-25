import { Title } from '@/components/atoms/typography'
import { AlertBox } from '@/components/molecules/AlertBox'
import { trpcServer } from '@/trpc/clients/server'

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

  return (
    <div>
      <Title>{chapter.title}</Title>
      <div className="max-w-lg whitespace-pre-wrap mt-6">{chapter.content}</div>
    </div>
  )
}
