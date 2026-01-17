import { z } from 'zod';

export const ApiErrorSchema = z.object({
  requestId: z.string(),
  statusCode: z.number().int(),
  error: z.string(),
  message: z.union([z.string(), z.array(z.string())]),
  path: z.string(),
  timestamp: z.string(),
});

export type ApiError = z.infer<typeof ApiErrorSchema>;

export function apiErrorMessage(err: unknown): string {
  const parsed = ApiErrorSchema.safeParse(err);
  if (!parsed.success) return "Request failed";

  const { message } = parsed.data;
  return typeof message === "string" ? message : message.join(", ");
}