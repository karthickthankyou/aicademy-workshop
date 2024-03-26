import { createTRPCRouter, protectedProcedure } from '..'

export const studentRoutes = createTRPCRouter({
  myConversations: protectedProcedure().query(async ({ ctx }) => {
    return ctx.db.conversation.findMany({
      where: { studentUid: ctx.userId },
      include: { Chapter: { include: { Course: true } } },
    })
  }),
})
