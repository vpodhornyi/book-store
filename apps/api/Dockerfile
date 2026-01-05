# ===== deps =====
FROM node:24-alpine AS deps
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps/api/package.json apps/api/package.json
COPY packages packages

RUN npm ci


# ===== build =====
FROM node:24-alpine AS build
WORKDIR /repo

COPY --from=deps /repo /repo
COPY . .

# Prisma needs DATABASE_URL to load prisma.config.ts (even for generate)
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Prisma client (packages/database)
RUN npm run db:generate --workspace=@repo/database

# Build Nest API
RUN npm run --workspace=apps/api build

# Remove devDependencies from root node_modules (shrinks final image a lot)
RUN npm prune --omit=dev


# ===== runner =====
FROM node:24-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# App build output
COPY --from=build /repo/apps/api/dist ./dist
COPY --from=build /repo/apps/api/package.json ./package.json

# Production dependencies (already pruned)
COPY --from=build /repo/node_modules ./node_modules

# Prisma schema + migrations + prisma config (needed for migrate container)
COPY --from=build /repo/packages/database/prisma ./packages/database/prisma
COPY --from=build /repo/packages/database/prisma.config.ts ./packages/database/prisma.config.ts

EXPOSE 3000
CMD ["node", "dist/main.js"]