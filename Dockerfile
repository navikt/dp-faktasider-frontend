FROM node:14 as build

ENV NODE_ENV=production
ENV TZ Europe/Oslo

RUN npm install -g gatsby-cli

WORKDIR /app

ADD package.json package-lock.json ./
RUN npm install

ADD . ./

ENV NODE_ENV=test
RUN npm run typeCheck
RUN npm run lint
RUN npm run test

ENV NODE_ENV=production
RUN npm run build

FROM gatsbyjs/gatsby
COPY --from=build /app/public /pub/arbeid
COPY --from=build /app/public/404/index.html /pub/404.html
COPY nginx-server-rules.conf /etc/nginx/server.conf
