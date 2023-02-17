FROM node:16-alpine
WORKDIR /app
COPY . .
RUN yarn install
CMD ["npm","start"]
EXPOSE 3000

# FROM node:12-alpine
# RUN apk add --no-cache python2 g++ make
# WORKDIR /app
# COPY . .
# RUN yarn install --production
# CMD ["yarn", "run", "dev"]
# EXPOSE 3000