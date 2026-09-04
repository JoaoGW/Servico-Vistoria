# syntax=docker/dockerfile:1

FROM node:24-alpine AS base

WORKDIR /app

FROM base AS dependencies

COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS build

COPY . ./
RUN npm run build

FROM base AS production-dependencies

COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

FROM base AS migration

COPY --from=dependencies /app/node_modules ./node_modules
COPY . ./
USER node
CMD ["./node_modules/.bin/drizzle-kit", "push", "--config=drizzle.config.ts"]

FROM base AS runner

ENV NODE_ENV=production
ENV PORT=3001

COPY --from=production-dependencies --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/dist ./dist

USER node
EXPOSE 3001
CMD ["node", "dist/main.js"]
