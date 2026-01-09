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
}).openapi({
  example: {
    title: 'Designing Data-Intensive Applications',
    author: 'Martin Kleppmann',
    description: 'A deep dive into data systems, scalability, and reliability',
    price: 44.50,
    stock: 7,
  },
});

export const UpdateBookRequestSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  author: z.string().min(3).max(100).optional(),
  description: z.string().min(20).max(500).nullable().optional(),
  price: z.number().nonnegative().optional(),
  stock: z.number().int().nonnegative().optional(),
})
  .refine((v) => Object.keys(v).length > 0, {
    message: 'At least one field must be provided',
  })
  .openapi({
    example: {
      price: 34.50,
    },
  });

export type BookResponse = z.output<typeof BookResponseSchema>;
export type CreateBookRequest = z.input<typeof CreateBookRequestSchema>;
export type UpdateBookRequest = z.input<typeof UpdateBookRequestSchema>;

