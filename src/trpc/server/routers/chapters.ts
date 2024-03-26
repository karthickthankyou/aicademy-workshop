import { formSchemaID, schemaDoubt } from '@/forms/schemas'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '..'
import { z } from 'zod'

export const chapterRoutes = createTRPCRouter({
  chapters: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.chapter.findMany()
  }),
  chapter: publicProcedure.input(formSchemaID).query(async ({ input, ctx }) => {
    return ctx.db.chapter.findUnique({
      where: { id: input.id },
      include: {
        Course: {
          select: {
            title: true,
            description: true,
          },
        },
      },
    })
  }),
  doubt: protectedProcedure()
    .input(schemaDoubt)
    .mutation(async ({ ctx, input }) => {
      const { chapterId, doubt } = input
      const { userId: studentUid } = ctx

      let student = await ctx.db.student.findUnique({
        where: { id: studentUid },
        include: { User: true },
      })

      if (!student) {
        student = await ctx.db.student.create({
          data: { id: studentUid },
          include: { User: true },
        })
      }

      let conversation = await ctx.db.conversation.findUnique({
        where: { chapterId_studentUid: { chapterId, studentUid } },
      })

      if (!conversation) {
        conversation = await ctx.db.conversation.create({
          data: { chapterId, studentUid },
        })
      }

      const newMessage = await ctx.db.message.create({
        data: {
          sender: 'STUDENT',
          content: doubt,
          conversationId: conversation.id,
        },
      })

      // Call AI to get the response.
      const answer = await ctx.ai.doubt({
        model: student.User.currentModel,
        conversationId: conversation.id,
        chapterId,
        doubt,
        studentUid,
      })

      return answer
    }),
  messages: protectedProcedure()
    .input(
      z.object({
        chapterId: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      const { userId: studentUid } = ctx
      const { chapterId } = input

      return ctx.db.message.findMany({
        where: { Conversation: { chapterId, studentUid } },
      })
    }),
})
