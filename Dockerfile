FROM node:14 AS builder

WORKDIR /home/node/app

ENV NODE_ENV=production
ENV TZ Europe/Oslo

COPY package*.json /home/node/app/
RUN npm ci

COPY . /home/node/app
RUN npm run build

FROM node:14-alpine AS runtime

WORKDIR /home/node/app

ENV PORT=3000
ENV NODE_ENV=production
ENV TZ Europe/Oslo

EXPOSE 3000

COPY --from=builder /home/node/app/ /home/node/app/

RUN chown node:node -R .next/

USER node

CMD ["npm", "start"]
