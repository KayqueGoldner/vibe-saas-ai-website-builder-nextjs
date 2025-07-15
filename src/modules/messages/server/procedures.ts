import { z } from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { prisma } from "@/lib/db";
import { inngest } from "@/inngest/client";

export const messagesRouter = createTRPCRouter({
  create: baseProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: "Message is required" }),
      }),
    )
    .mutation(async ({ input }) => {
      const createdMessage = await prisma.message.create({
        data: {
          content: input.value,
          role: "USER",
          type: "RESULT",
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: { value: input.value },
      });

      return createdMessage;
    }),
  getMany: baseProcedure.query(async () => {
    const messages = await prisma.message.findMany({
      orderBy: {
        updatedAt: "asc",
      },
    });

    return messages;
  }),
});
