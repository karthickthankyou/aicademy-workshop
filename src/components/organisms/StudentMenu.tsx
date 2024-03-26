import { Link } from '../molecules/CustomLink'

export const StudentMenu = () => {
  return (
    <div className="flex flex-col w-full max-w-xs gap-2">
      <Link href="/student">Dashboard</Link>
      <Link href="/student/credits">AI Credits</Link>
      <Link href="/student/conversations">Conversations</Link>
      <Link href="/student/tests">Tests</Link>
    </div>
  )
}
