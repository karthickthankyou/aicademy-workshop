'use client'
import { useFormAddCredits } from '@/forms/addCredits'
import { trpcClient } from '@/trpc/clients/client'
import { useState } from 'react'
import { Button } from '../atoms/button'
import { SimpleDialog } from '../molecules/SimpleDialog'
import { Label } from '../atoms/label'
import { Input } from '../atoms/input'
import { loadStripe } from '@stripe/stripe-js'

export const AddCredits = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useFormAddCredits()
  const { mutateAsync: createStripeSession } =
    trpcClient.stripe.createSession.useMutation()
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div>
      <Button
        onClick={() => {
          setOpenDialog(true)
        }}
      >
        Buy more credits
      </Button>
      <SimpleDialog
        open={openDialog}
        setOpen={setOpenDialog}
        title="Add Credits"
      >
        <form
          onSubmit={handleSubmit(async (data) => {
            const stripeSession = await createStripeSession(data)
            const publishableKey =
              process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

            const stripe = await loadStripe(publishableKey || '')
            await stripe?.redirectToCheckout({
              sessionId: stripeSession.sessionId,
            })
            reset()
          })}
        >
          <Label title={'Credits'} error={errors.creditsCount?.message}>
            <Input
              placeholder="Enter credits..."
              type="number"
              {...register('creditsCount', { valueAsNumber: true })}
            />
          </Label>
          <Button type="submit">Create</Button>
        </form>
      </SimpleDialog>
    </div>
  )
}
