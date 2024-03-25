import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { prisma } from '@/db'

export const appRouter = createTRPCRouter({
  users: protectedProcedure('admin').query(() => {
    return prisma.user.findMany()
  }),
})

export type AppRouter = typeof appRouter
