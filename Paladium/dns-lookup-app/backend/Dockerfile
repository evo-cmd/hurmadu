FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./


# Ensure Node.js types are installed for TypeScript
RUN npm install && npm install --save-dev @types/node

COPY . .

RUN npm run build

EXPOSE 5000

CMD ["node", "dist/server.js"]