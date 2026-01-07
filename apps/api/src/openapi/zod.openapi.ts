import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';

import {
  BookResponseSchema,
  CreateBookRequestSchema,
  UpdateBookRequestSchema,
} from '@repo/contracts';

export function generateZodOpenApi() {
  const registry = new OpenAPIRegistry();

  registry.register('BookResponse', BookResponseSchema);
  registry.register('CreateBookRequest', CreateBookRequestSchema);
  registry.register('UpdateBookRequest', UpdateBookRequestSchema);

  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: '3.0.0',
    info: {
      title: 'Book Store – Contracts',
      version: '1.0.0',
    },
  });
}
