export const getModelName = (model: string) =>
  model.split('__').join('.').split('_').join('-')
