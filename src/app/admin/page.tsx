import { StatCard } from '@/components/molecules/StatCard'
import { trpcServer } from '@/trpc/clients/server'
import { Book, Lock, User } from 'lucide-react'

export default async function Page() {
  const dashboard = await trpcServer.admins.dashboard.query()
  return (
    <div className="grid grid-cols-3 gap-3">
      <StatCard label="Admins" href={'admin/manageAdmins'} Icon={Lock}>
        {dashboard.adminCount}
      </StatCard>
      <StatCard label="Courses" href={'admin/manageCourses'} Icon={Book}>
        {dashboard.courseCount}
      </StatCard>
      <StatCard Icon={User} label={'Students'}>
        {dashboard.studentCount}
      </StatCard>
    </div>
  )
}
