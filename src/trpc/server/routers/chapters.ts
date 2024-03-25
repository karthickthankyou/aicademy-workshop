import { formSchemaID } from '@/forms/schemas'
import { createTRPCRouter, publicProcedure } from '..'

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
})
