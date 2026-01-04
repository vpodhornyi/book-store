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

# Prisma client (packages/database)
ENV DATABASE_URL="postgresql://user:pass@localhost:5432/db?schema=public"
RUN npm run db:generate --workspace=@repo/database

# Build Nest API
RUN npm run --workspace=apps/api build

# ===== runner =====
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /repo/apps/api/dist ./dist
COPY --from=build /repo/apps/api/package.json ./package.json
COPY --from=build /repo/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/main.js"]