import { TRPCError } from '@trpc/server';
import { z } from "zod";
import { createRouter } from "./createRouter";
import { prisma } from "../prisma";

const dateSchema = z.preprocess((arg) => {
  if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  return;
}, z.date());

export const EventSchema = z.object({
  title: z.string().min(1, { message: "Field required" }),
  firstName: z.string().min(1, { message: "Field required" }),
  lastName: z.string().min(1, { message: "Field required" }),
  email: z.string().min(1, { message: "Field required" }).email(),
  eventDate: dateSchema,
  details: z.string(),
});

export type Event = z.infer<typeof EventSchema>;

export const event = createRouter()
  .mutation("add", {
    input: EventSchema,
    async resolve({ input }) {
      const newEvent: Event = {
        title: input.title,
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        eventDate: input.eventDate,
        details: input.details,
      };
      return await prisma.event.create({
        data: newEvent,
      });
    },
  })
  .query('byId', {
    input: z.object({
      id: z.number(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const event = await prisma.event.findUnique({
        where: { id },
      });
      if (!event) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No event with id '${id}'`,
        });
      }
      return event;
    },
  })
  .query("all", {
    async resolve() {
      return await prisma.event.findMany();
    },
  });
