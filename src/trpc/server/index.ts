import { auth } from '@clerk/nextjs'
import { initTRPC } from '@trpc/server'

export const createTRPCContext = async (opts: { headers: Headers }) => {
  const session = auth()

  return {
    db: prisma,
    session,
    ...opts,
  }
}

const t = initTRPC.create()

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
