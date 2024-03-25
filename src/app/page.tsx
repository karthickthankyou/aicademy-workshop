import { trpcServer } from '@/trpc/clients/server'
import { UserButton } from '@clerk/nextjs'

export default async function Home() {
  const users = await trpcServer.users.query()
  return (
    <main>
      hello world!!!
      <UserButton />
      {users?.map((user) => <div key={user.id}>{user.image}</div>)}
    </main>
  )
}
