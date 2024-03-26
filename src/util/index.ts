import { AIModel } from '@prisma/client'

export const getModelName = (model: AIModel | null) => {
  if (!model) {
    return '-'
  }
  return model.split('__').join('.').split('_').join('-')
}
