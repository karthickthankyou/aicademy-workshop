import { z } from 'zod'
import { schemaSubmitTest } from './schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export type FormTypeTest = z.infer<typeof schemaSubmitTest>

export const useFormTest = ({
  defaultValues = { answers: [] },
}: {
  defaultValues?: Partial<FormTypeTest>
}) =>
  useForm<FormTypeTest>({
    resolver: zodResolver(schemaSubmitTest),
    defaultValues,
  })
