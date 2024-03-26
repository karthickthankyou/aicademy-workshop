import { AlertBox } from '@/components/molecules/AlertBox'
import { trpcServer } from '@/trpc/clients/server'
import { redirect } from 'next/navigation'

export default async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const sessionId = searchParams?.session_id as string

  if (!sessionId) {
    return <AlertBox>Session id missing.</AlertBox>
  }

  const creditBalance = await trpcServer.stripe.checkout.mutate({
    sessionId,
  })

  if (creditBalance.id) {
    redirect('/student/credits')
  }

  return null
}
