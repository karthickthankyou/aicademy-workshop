import { createTRPCRouter, publicProcedure } from '..'
import { prisma } from '@/db'

export const appRouter = createTRPCRouter({
  users: publicProcedure.query(() => {
    return prisma.user.findMany()
  }),
})

export type AppRouter = typeof appRouter
