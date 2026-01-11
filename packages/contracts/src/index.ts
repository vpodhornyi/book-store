import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export * from './books/book.schema';
export * from './common/api-error.schema';
export * from './users/user.schema';