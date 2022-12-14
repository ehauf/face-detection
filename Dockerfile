FROM node

RUN apt-get update && apt-get install -y build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

WORKDIR /var/app

COPY . /var/app
RUN npm install 
RUN npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]