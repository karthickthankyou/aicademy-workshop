import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { prisma } from '@/db'
import { adminRoutes } from './admins'

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
})

export type AppRouter = typeof appRouter
