import { appRouter } from '@/trpc/server/routers'
import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { NextRequest } from 'next/server'

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    router: appRouter,
    req,
    createContext: (req) => {
      return req
    },
  })

export { handler as GET, handler as POST }
