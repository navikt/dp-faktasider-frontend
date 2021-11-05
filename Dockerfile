FROM node:14 AS builder


WORKDIR /home/node/app

ENV NODE_ENV=production
ENV TZ Europe/Oslo


RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    echo "[auth]\n"\
    "token=$(cat /run/secrets/SENTRY_AUTH_TOKEN)" >> .sentryclirc

COPY package*.json /home/node/app/

RUN npm ci


COPY . /home/node/app
RUN npm run build

FROM node:16-alpine AS runtime

WORKDIR /home/node/app

ENV PORT=3000
ENV NODE_ENV=production
ENV TZ Europe/Oslo

EXPOSE 3000

COPY --from=builder /home/node/app/ /home/node/app/

RUN chown node:node -R .next/

USER node

CMD ["npm", "start"]
