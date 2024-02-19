import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "app/server/api/trpc";

export const movieRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
  .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call

      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existingMovie = await ctx.db.movie.findFirst({
        where: { name: input.name },
      });
  
      if (existingMovie) {
        return { error: `${existingMovie.name} movie already exists.`};
      }

      await ctx.db.movie.create({
        data: {
          name: input.name,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });

      return { message: 'Movie created successfully'};
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.movie.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.movie.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});
