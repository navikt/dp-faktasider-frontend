FROM node:14 AS builder

WORKDIR /usr/src/app

COPY *.json ./
COPY sanity/*.json ./sanity/
RUN npm ci
RUN npm i lerna -g
RUN lerna bootstrap

RUN npm i @sanity/cli -g
ENV NODE_ENV=production

COPY . ./
RUN npm run build-next

FROM node:14-alpine AS runtime

WORKDIR /usr/src/app

ENV PORT=3000 \
    NODE_ENV=production

EXPOSE 3000
USER node

COPY --from=builder /usr/src/app/next.config.js ./
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/csp.js ./
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/node_modules ./node_modules

CMD ["npm", "start"]
