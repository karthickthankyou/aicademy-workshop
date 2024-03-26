'use client'
import { trpcClient } from '@/trpc/clients/client'
import { Label } from '../atoms/label'
import { HtmlSelect } from '../atoms/select'
import { $Enums } from '@prisma/client'
import { getModelName } from '@/util'
import { useToast } from '../molecules/Toaster/use-toast'

export const SetModel = () => {
  const { toast } = useToast()

  const utils = trpcClient.useUtils()
  const { data } = trpcClient.aiModel.currentModel.useQuery()

  const { mutateAsync: updateAiModel } =
    trpcClient.aiModel.updateCurrentModel.useMutation({
      onSuccess(data, variables, context) {
        utils.aiModel.currentModel.invalidate()
        toast({ title: `Model updated to ${data.currentModel}` })
      },
    })

  return (
    <Label title="Active Model">
      <HtmlSelect
        value={data}
        onChange={async (e) => {
          const selectedModel = e.target.value as $Enums.AIModel
          await updateAiModel({ model: selectedModel })
        }}
        placeholder="Model"
      >
        {Object.values($Enums.AIModel).map((type) => (
          <option key={type} value={type}>
            {getModelName(type)}
          </option>
        ))}
      </HtmlSelect>
    </Label>
  )
}
