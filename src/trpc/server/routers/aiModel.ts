import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '..'
import { $Enums } from '@prisma/client'

export const aiModelRoutes = createTRPCRouter({
  currentModel: protectedProcedure().query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { id: ctx.userId },
    })
    return user?.currentModel
  }),
  updateCurrentModel: protectedProcedure()
    .input(z.object({ model: z.nativeEnum($Enums.AIModel) }))
    .mutation(({ ctx, input }) => {
      return ctx.db.user.update({
        where: { id: ctx.userId },
        data: { currentModel: input.model },
      })
    }),
})
