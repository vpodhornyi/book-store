FROM node:20-alpine AS deps
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps/web/package.json apps/web/package.json
COPY packages packages

RUN npm ci

FROM node:24-alpine AS build
WORKDIR /repo
COPY --from=deps /repo /repo
COPY . .

RUN npm run --workspace=apps/web build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /repo/apps/web/.next ./.next
COPY --from=build /repo/apps/web/public ./public
COPY --from=build /repo/apps/web/package.json ./package.json
COPY --from=build /repo/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "run", "--workspace=apps/web", "start"]