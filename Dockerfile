FROM node:16 AS builder
WORKDIR /home/node/app

ENV NODE_ENV=production
ENV TZ Europe/Oslo
ENV CI=true

COPY package*.json /home/node/app/
COPY prepare.js /home/node/app/

RUN npm ci

RUN --mount=type=secret,id=SENTRY_AUTH_TOKEN \
    echo "[auth]\n"\
    "token=$(cat /run/secrets/SENTRY_AUTH_TOKEN)" >> .sentryclirc

COPY . /home/node/app
COPY /src/pages/ /home/node/app/pages
RUN ls -R .
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
