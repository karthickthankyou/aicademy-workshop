import { schemaCreateUser } from '@/forms/createUser'
import { createTRPCRouter, protectedProcedure } from '..'
import { TRPCError } from '@trpc/server'

export const adminRoutes = createTRPCRouter({
  adminMe: protectedProcedure().query(({ ctx }) => {
    return ctx.db.admin.findUnique({
      where: { id: ctx.userId },
      include: { User: true },
    })
  }),
  admins: protectedProcedure('admin').query(async ({ ctx }) => {
    return ctx.db.admin.findMany({ include: { User: true } })
  }),
  create: protectedProcedure('admin')
    .input(schemaCreateUser)
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.db.admin.findUnique({ where: { id: input.id } })
      if (admin) {
        return new TRPCError({
          code: 'BAD_REQUEST',
          message: 'The user is already an admin.',
        })
      }
      return ctx.db.admin.create({ data: input })
    }),
})
