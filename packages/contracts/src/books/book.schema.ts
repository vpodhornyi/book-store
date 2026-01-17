import { z } from "zod";

import {BaseEntityResponseSchema} from "../common/base.schema";

export const BookResponseSchema = BaseEntityResponseSchema.extend({
  title: z.string().min(3).max(100),
  author: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  price: z.number().nonnegative(),
  stock: z.number().int().positive().min(0),
})

export const CreateBookRequestSchema = z.object({
  title: z.string().min(3).max(100),
  author: z.string().min(3).max(100),
  description: z.string().min(20).max(500).nullable().optional(),
  price: z.number().nonnegative(),
  stock: z.number().int().positive().min(0),
})

export const UpdateBookRequestSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  author: z.string().min(3).max(100).optional(),
  description: z.string().min(20).max(500).nullable().optional(),
  price: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
})

export type BookResponse = z.infer<typeof BookResponseSchema>;
export type CreateBookRequest = z.infer<typeof CreateBookRequestSchema>;
export type UpdateBookRequest = z.infer<typeof UpdateBookRequestSchema>;