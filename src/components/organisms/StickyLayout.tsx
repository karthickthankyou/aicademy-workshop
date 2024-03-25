import { ReactNode } from 'react'

export const StickyLayout = ({
  sidebarContent,
  children,
}: {
  sidebarContent: ReactNode
  children: ReactNode
}) => {
  return (
    <div className="flex min-h-screen gap-2 bg-gray-100">
      <div className="sticky h-screen max-w-xs bg-white min-w-48 top-12">
        {sidebarContent}
      </div>

      <div className="flex-grow p-4">{children}</div>
    </div>
  )
}
