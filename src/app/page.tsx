'use client'
import { trpcClient } from '@/trpc/clients/client'
import { UserButton } from '@clerk/nextjs'

export default function Home() {
  const { data, isError, isLoading } = trpcClient.users.useQuery()
  return (
    <main>
      hello world!!!
      <UserButton />
      {data?.map((user) => <div key={user.id}>{user.image}</div>)}
    </main>
  )
}
