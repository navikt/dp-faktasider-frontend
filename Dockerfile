FROM node:14 as build

ENV NODE_ENV=production
RUN npm install -g gatsby-cli

WORKDIR /app

ADD package.json package-lock.json ./
RUN npm install

ADD . ./
RUN npm run build
RUN npm run test

FROM gatsbyjs/gatsby
COPY --from=build /app/public /pub/arbeid
COPY --from=build /app/public/404/index.html /pub/404.html
COPY nginx-server-rules.conf /etc/nginx/server.conf
