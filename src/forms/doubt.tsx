import { z } from 'zod'
import { schemaDoubt } from './schemas'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

export const schemaDoubtOnly = schemaDoubt.omit({ chapterId: true })

export type FormTypeDoubtOnly = z.infer<typeof schemaDoubtOnly>

export const useFormDoubt = () =>
  useForm<FormTypeDoubtOnly>({
    resolver: zodResolver(schemaDoubtOnly),
  })
