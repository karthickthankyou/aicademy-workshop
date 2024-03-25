'use client'
import { useFormCreateUser } from '@/forms/createUser'
import { Title3 } from '../atoms/typography'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { trpcClient } from '@/trpc/clients/client'
import { useToast } from '../molecules/Toaster/use-toast'
import { revalidatePath } from '@/util/actions'
import { useRouter } from 'next/navigation'

export const CreateAdmin = () => {
  const { register, handleSubmit, reset } = useFormCreateUser()

  const { toast } = useToast()
  const router = useRouter()

  const { isLoading, mutateAsync: createAdmin } =
    trpcClient.admins.create.useMutation({
      onSuccess(data, variables, context) {
        reset()
        toast({ title: 'Admin created.' })
        revalidatePath('/admin/manageAdmins')
        router.replace('/admin/manageAdmins')
      },
      onError({ message }) {
        toast({ title: message })
      },
    })

  return (
    <div className="w-full max-w-md p-4 bg-white shadow-lg rounded-lg">
      <Title3 className="mb-2">Create Admin</Title3>
      <form
        onSubmit={handleSubmit(async (data) => {
          await createAdmin(data)
        })}
      >
        <Label title="UID">
          <Input placeholder="UID" {...register('id')} />
        </Label>
        <Button type="submit" loading={isLoading}>
          Submit
        </Button>
      </form>
    </div>
  )
}
