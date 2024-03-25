import { Link } from '../molecules/CustomLink'

export interface IAdminMenuProps {}

export const AdminMenu = () => {
  return (
    <div className="flex flex-col gap-1">
      <Link href="/admin">Dashboard</Link>

      <Link href="/admin/manageCourses">Courses</Link>
      <Link href="/admin/manageCourses/new" className="pl-4">
        New course
      </Link>
      <div className="h-[1px] bg-gray-300 my-1 " />
      <Link href="/admin/manageAdmins">Admins</Link>
      <Link href="/admin/manageAdmins/new" className="pl-4">
        New admin
      </Link>
    </div>
  )
}
