import { ReactNode } from 'react'

export type Role = 'admin' | 'student'

export type BaseComponent = {
  children?: ReactNode
  className?: string
}
