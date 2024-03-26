import { z } from 'zod'
import { schemaPayment } from './schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const schemaAddCredits = schemaPayment.omit({ userId: true })
export type FormTypeAddCredits = z.infer<typeof schemaAddCredits>

export const useFormAddCredits = () =>
  useForm<FormTypeAddCredits>({
    resolver: zodResolver(schemaAddCredits),
    defaultValues: { creditsCount: 20 },
  })
