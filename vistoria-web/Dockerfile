# syntax=docker/dockerfile:1

FROM node:24-alpine AS base

WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS dependencies

COPY package.json package-lock.json ./
RUN npm ci

FROM dependencies AS build

COPY . ./
RUN npm run build

FROM base AS runner

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public

USER node
EXPOSE 3000
CMD ["node", "server.js"]
