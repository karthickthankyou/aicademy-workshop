import { cn } from '@/util/styles'
import { BaseComponent } from '@/util/types'

type TextType = {
  as?: React.ElementType
} & BaseComponent

export const Title = ({ children, className, as = 'h1' }: TextType) => {
  const Component = as

  return (
    <Component className={cn('text-xl font-semibold capitalize ', className)}>
      {children}
    </Component>
  )
}

export const Title2 = ({ children, className, as = 'h2' }: TextType) => {
  const Component = as

  return (
    <Component className={cn('text-lg font-semibold capitalize ', className)}>
      {children}
    </Component>
  )
}
export const Title3 = ({ children, className, as = 'h3' }: TextType) => {
  const Component = as

  return (
    <Component className={cn('font-semibold capitalize ', className)}>
      {children}
    </Component>
  )
}
export const Description = ({ children, className, as = 'p' }: TextType) => {
  const Component = as

  return (
    <Component className={cn('text-gray-700', className)}>{children}</Component>
  )
}
