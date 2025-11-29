FROM node:22-alpine AS dep

WORKDIR /src/app

COPY package.json package-lock.json* ./

RUN npm ci

FROM node:22-alpine AS runner

WORKDIR /src/app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=dep /src/app/node_modules ./node_modules

COPY . .

EXPOSE 3000

RUN chown -R appuser:appgroup /src/app 

USER appuser

CMD ["node", "server.js"]



