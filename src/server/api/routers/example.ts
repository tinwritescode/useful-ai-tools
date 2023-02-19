import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

const openai = new OpenAIApi(new Configuration({}));

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
