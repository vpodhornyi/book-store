# Database package (Prisma)

This package is the single source of truth for the database schema and migrations.

It contains:
- Prisma schema
- Database migrations
- Prisma configuration for all environments

## Structure
```text
packages/database
├─ prisma/
│  ├─ schema.prisma        # Database schema (source of truth)
│  ├─ migrations/          # All database migrations (tracked in git)
│  └─ seed.ts              # Optional seed script
│
├─ prisma.config.ts        # Prisma runtime configuration
└─ README.md
```
## Migration workflow (IMPORTANT)

## package.json scripts
```aiignore
  "scripts": {
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:deploy": "prisma migrate deploy",
    "db:push": "prisma db push"
  },
```

### Creating a new migration (local development only)

1. Modify prisma/schema.prisma
2. Create a migration locally:

npm run db:migrate -- --name add_orders

This will:
- generate a new migration in prisma/migrations
- apply it to your local database

NEVER run migrate dev in production.

### Applying existing migrations (dev / production)

After pulling changes from the repository:

npm run db:deploy

This applies all not yet executed migrations.

Used in:
- production
- CI
- fresh environments
- Docker migrate container

## Prisma commands summary

prisma migrate dev
- Create new migrations
- Local development only

prisma migrate deploy
- Apply existing migrations
- Development and production

prisma db push
- Sync schema without migrations
- Local experiments only

## Database connection

- Database URL is NOT stored in schema.prisma
- Connection is provided via:
    - prisma.config.ts
    - DATABASE_URL environment variable

Example:

DATABASE_URL=postgresql://book_store_user:password@postgres:5432/book_store?schema=public

## Rules

- Schema changes are made only via schema.prisma
- Migrations are always committed to git
- Production uses only migrate deploy
- Applications must never use admin database credentials

## Notes

Migration history and authorship are tracked via git history
(prisma/migrations/*)
