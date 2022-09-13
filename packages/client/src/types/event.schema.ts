import * as z from 'zod';

export const dateSchema = z.preprocess((arg) => {
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
