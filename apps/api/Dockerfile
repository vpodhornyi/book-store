# ===== pruner (make minimal repo for apps/api) =====
FROM node:24-alpine AS pruner
WORKDIR /repo

# turbo нужен для prune
RUN npm i -g turbo

COPY . .
# produces /repo/out with only needed workspaces + pruned lockfiles
RUN turbo prune --scope=apps/api --docker


# ===== deps (install deps for pruned repo) =====
FROM node:24-alpine AS deps
WORKDIR /repo

# out/json contains package.json + lockfile subset
COPY --from=pruner /repo/out/json/ ./
RUN npm ci


# ===== build =====
FROM node:24-alpine AS build
WORKDIR /repo

# full source for pruned repo
COPY --from=pruner /repo/out/full/ ./
COPY --from=deps /repo/node_modules ./node_modules

# Prisma needs DATABASE_URL to load prisma.config.ts (even for generate)
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Prisma client (packages/database)
RUN npm run db:generate --workspace=@repo/database

# Build Nest API
RUN npm run --workspace=apps/api build

# Keep only prod deps (in THIS pruned repo)
RUN npm prune --omit=dev


# ===== runner =====
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# App build output
COPY --from=build /repo/apps/api/dist ./dist
COPY --from=build /repo/apps/api/package.json ./package.json

# Prod deps only (now much smaller)
COPY --from=build /repo/node_modules ./node_modules

# Prisma schema+migrations+config (needed for migrate deploy in container)
COPY --from=build /repo/packages/database/prisma ./packages/database/prisma
COPY --from=build /repo/packages/database/prisma.config.ts ./packages/database/prisma.config.ts

EXPOSE 3000
CMD ["node", "dist/main.js"]