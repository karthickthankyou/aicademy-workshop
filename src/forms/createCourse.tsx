import { z } from 'zod'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchemaCreateCourse } from './schemas'
import { ReactNode } from 'react'

export type FormTypeCreateCourse = z.infer<typeof formSchemaCreateCourse>

export const useFormCreateCourse = () =>
  useForm<FormTypeCreateCourse>({
    resolver: zodResolver(formSchemaCreateCourse),
  })

export const FormProviderCreateCourse = ({
  children,
}: {
  children: ReactNode
}) => {
  const methods = useFormCreateCourse()
  return <FormProvider {...methods}>{children}</FormProvider>
}

export const useFormContextCreateCourse = () =>
  useFormContext<FormTypeCreateCourse>()
