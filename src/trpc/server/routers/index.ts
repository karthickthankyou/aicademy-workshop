import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { prisma } from '@/db'
import { adminRoutes } from './admins'
import { coursesRoutes } from './courses'
import { chapterRoutes } from './chapters'

export const appRouter = createTRPCRouter({
  admins: adminRoutes,
  courses: coursesRoutes,
  chapters: chapterRoutes,
})

export type AppRouter = typeof appRouter
