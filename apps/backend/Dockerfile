###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18.14.0-alpine As build_dev

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN yarn install --frozen-lockfile

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:18.14.0-alpine As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=build_dev /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN yarn build
ENV NODE_ENV production

RUN yarn install --frozen-lockfile --production && yarn cache clean

USER node

###################
# PRODUCTION
###################

FROM node:18.14.0-alpine As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/scripts ./scripts

EXPOSE 8000

RUN chmod +x ./scripts/start.sh
CMD ["/bin/sh", "./scripts/start.sh"]


###################
# DEVELOPMENT
###################

FROM node:18.14.0-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=build_dev /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .

RUN yarn build
ENV NODE_ENV development

EXPOSE 8000

RUN chmod +x ./scripts/start.sh
CMD ["/bin/sh", "./scripts/start.sh"]