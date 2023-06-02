FROM node:16-alpine as base
RUN corepack enable && \ 
    corepack prepare pnpm@latest-8 --activate

FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm fetch --dev && \
    pnpm install --offline --dev

FROM base as build
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm build && \
    pnpm prune --prod

FROM base as deploy
WORKDIR /app

COPY --from=build /app/package.json ./
COPY --from=build /app/build ./
COPY --from=build /app/node_modules ./node_modules

EXPOSE 8080

CMD ["node", "index.js"]