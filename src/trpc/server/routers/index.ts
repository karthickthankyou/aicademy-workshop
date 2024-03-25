import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { prisma } from '@/db'
import { adminRoutes } from './admins'
import { coursesRoutes } from './courses'

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  courses: coursesRoutes,
})

export type AppRouter = typeof appRouter
