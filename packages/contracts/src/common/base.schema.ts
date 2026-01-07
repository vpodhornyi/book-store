import {z} from 'zod';


export const BaseIdSchema = z.object({
  id: z.number().int().positive(),
});

export const BaseTimestampsSchema = z.object({
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const BaseEntityResponseSchema = BaseIdSchema.extend(BaseTimestampsSchema.shape);