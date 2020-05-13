FROM node:14 as build

ENV NODE_ENV=production
RUN npm install -g gatsby-cli

WORKDIR /app

ADD package.json package-lock.json ./
RUN npm install

ADD . ./
RUN gatsby build

FROM gatsbyjs/gatsby
COPY --from=build /app/public /pub/arbeid/dagpenger/nye-faktasider
COPY nginx-server-rules.conf /etc/nginx/server.conf
