FROM node:14 AS builder

WORKDIR /home/node/app

COPY package*.json /home/node/app/
RUN npm ci

ENV NODE_ENV=production

COPY . /home/node/app
RUN npm run build

FROM node:14-alpine AS runtime

USER node

WORKDIR /home/node/app

ENV PORT=3000 \
    NODE_ENV=production

EXPOSE 3000

COPY --from=builder /home/node/app/ /home/node/app/

CMD ["npm", "start"]
