import { $Enums, AIModel } from '@prisma/client'

interface ModelCosts {
  promptTokenCost: number
  completionTokenCost: number
}

export const EXAM_MODEL: AIModel = 'gpt_4'
export const MARKS_PER_QUESTION = 20

export const MODEL_COSTS: Record<$Enums.AIModel, ModelCosts> = {
  [$Enums.AIModel.gpt_4_0125_preview]: {
    promptTokenCost: 0.01,
    completionTokenCost: 0.03,
  },
  [$Enums.AIModel.gpt_4_turbo_preview]: {
    promptTokenCost: 0.01,
    completionTokenCost: 0.03,
  },
  [$Enums.AIModel.gpt_4_1106_preview]: {
    promptTokenCost: 0.01,
    completionTokenCost: 0.03,
  },
  [$Enums.AIModel.gpt_4_vision_preview]: {
    promptTokenCost: 0.01,
    completionTokenCost: 0.03,
  },
  [$Enums.AIModel.gpt_4_1106_vision_preview]: {
    promptTokenCost: 0.01,
    completionTokenCost: 0.03,
  },
  [$Enums.AIModel.gpt_4]: { promptTokenCost: 0.03, completionTokenCost: 0.06 },
  [$Enums.AIModel.gpt_4_0613]: {
    promptTokenCost: 0.03,
    completionTokenCost: 0.06,
  },
  [$Enums.AIModel.gpt_4_32k]: {
    promptTokenCost: 0.06,
    completionTokenCost: 0.12,
  },
  [$Enums.AIModel.gpt_4_32k_0613]: {
    promptTokenCost: 0.06,
    completionTokenCost: 0.12,
  },
  [$Enums.AIModel.gpt_3__5_turbo_0125]: {
    promptTokenCost: 0.0005,
    completionTokenCost: 0.0015,
  },
  [$Enums.AIModel.gpt_3__5_turbo]: {
    promptTokenCost: 0.0015,
    completionTokenCost: 0.002,
  },
  [$Enums.AIModel.gpt_3__5_turbo_1106]: {
    promptTokenCost: 0.0015,
    completionTokenCost: 0.002,
  },
  [$Enums.AIModel.gpt_3__5_turbo_instruct]: {
    promptTokenCost: 0.0015,
    completionTokenCost: 0.002,
  },
  [$Enums.AIModel.gpt_3__5_turbo_16k]: {
    promptTokenCost: 0.0015,
    completionTokenCost: 0.002,
  },
  [$Enums.AIModel.gpt_3__5_turbo_0613]: {
    promptTokenCost: 0.0015,
    completionTokenCost: 0.002,
  },
  [$Enums.AIModel.gpt_3__5_turbo_16k_0613]: {
    promptTokenCost: 0.0015,
    completionTokenCost: 0.002,
  },
}
