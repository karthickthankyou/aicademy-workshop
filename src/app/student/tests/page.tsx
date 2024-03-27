import { AlertBox } from '@/components/molecules/AlertBox'
import { StudentTests } from '@/components/templates/StudentTests'
import { trpcServer } from '@/trpc/clients/server'

export default async function Page() {
  const myTests = await trpcServer.tests.myTests.query()
  if (!myTests.length) {
    return <AlertBox>No tests found.</AlertBox>
  }
  return <StudentTests tests={myTests || []} />
}
