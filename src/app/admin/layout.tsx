import { AlertBox } from '@/components/molecules/AlertBox'
import { SimpleSidebar } from '@/components/molecules/SimpleSidebar'
import { TellThem } from '@/components/molecules/TellThem'
import { AdminMenu } from '@/components/organisms/AdminMenu'
import { trpcServer } from '@/trpc/clients/server'
import { auth } from '@clerk/nextjs'
import { Divide } from 'lucide-react'
import Link from 'next/link'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await auth()

  if (!user?.userId) {
    return (
      <AlertBox>
        <Link href="/signIn">Sign In</Link>
      </AlertBox>
    )
  }

  const adminMe = await trpcServer.admins.adminMe.query()

  if (!adminMe) {
    return <TellThem uid={user.userId} role="admin" />
  }

  return (
    <div className="flex">
      <div className="hidden w-full max-w-xs sm:block">
        <AdminMenu />
      </div>

      <div className="flex-grow">
        <div className="sm:hidden">
          <SimpleSidebar>
            <AdminMenu />
          </SimpleSidebar>
        </div>
        <div className="bg-gray-100 min-h-[calc(100vh-8rem)] py-2 px-4">
          {children}
        </div>
      </div>
    </div>
  )
}
