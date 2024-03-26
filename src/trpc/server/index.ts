import { Role } from '@/util/types'
import { auth } from '@clerk/nextjs'
import { TRPCError, initTRPC } from '@trpc/server'
import { authorizeUser } from './util'
import { prisma } from '@/db'
import { AIService } from '@/ai/ai.service'

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = auth()
  const ai = new AIService()

  return {
    db: prisma,
    session,
    ai,
    ...opts,
  }
}

const t = initTRPC.context<typeof createTRPCContext>().create()

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = (...roles: Role[]) =>
  publicProcedure.use(async ({ ctx, next }) => {
    if (!ctx.session?.userId) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'Sign in to access this data.',
      })
    }

    await authorizeUser(ctx.session.userId, roles)

    return next({ ctx: { ...ctx, userId: ctx.session.userId } })
  })
