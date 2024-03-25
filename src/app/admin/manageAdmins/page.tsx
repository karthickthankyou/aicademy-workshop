import { Title2 } from '@/components/atoms/typography'
import { UserCard } from '@/components/organisms/UserCard'
import { trpcServer } from '@/trpc/clients/server'

export default async function Page() {
  const admins = await trpcServer.admins.admins.query()
  return (
    <div>
      <Title2>Admins</Title2>

      <div className="space-y-3">
        {admins?.map((admin) => (
          <UserCard key={admin.User.id} user={admin.User} />
        ))}
      </div>
    </div>
  )
}
