# ===== deps =====
FROM node:24-alpine AS deps
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages packages
RUN npm ci

# ===== build =====
FROM node:24-alpine AS build
WORKDIR /repo

COPY --from=deps /repo /repo
COPY . .
RUN npm run --workspace=apps/web build

# ===== runner =====
FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Standalone already contains minimal runtime node_modules inside
COPY --from=build /repo/apps/web/.next/standalone ./
COPY --from=build /repo/apps/web/.next/static ./apps/web/.next/static
# COPY --from=build /repo/apps/web/public ./apps/web/public

EXPOSE 3000
CMD ["node", "apps/web/server.js"]