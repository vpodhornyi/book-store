import type {
  SchemaObject,
  ReferenceObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

type SwaggerSchemas = Record<string, SchemaObject | ReferenceObject>;

export function mergeSchemas(
  target: { components?: { schemas?: SwaggerSchemas } },
  source: unknown,
) {
  const schemas = (source ?? {}) as SwaggerSchemas;

  target.components = target.components ?? {};
  target.components.schemas = {
    ...(target.components.schemas ?? {}),
    ...schemas,
  };
}
