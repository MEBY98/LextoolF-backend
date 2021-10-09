FROM node:14
WORKDIR /app
RUN npm config set http-proxy=http://192.168.205.251:3128
RUN npm config set https-proxy=http://192.168.205.251:3128
ENV http_proxy http://192.168.205.251:3128
ENV https_proxy http://192.168.205.251:3128
COPY ./package.json ./
RUN npm install --silent
COPY . .
EXPOSE 10000
RUN npm run build
RUN npm run migrate:up 1631672035443-UseInformationGramatical.ts
RUN npm run migrate:up 1631672479766-UseInformationTS.ts
RUN npm run migrate:up 1631672863889-UseInformationDiatopica.ts
RUN npm run migrate:up 1631673203764-UseInformationDiafasica.ts
RUN npm run migrate:up 1631673747835-UseInformationDiatrastica.ts
RUN npm run migrate:up 1631673757790-UseInformationDiatecnica.ts
RUN npm run migrate:up 1631673772347-UseInformationPragmatica.ts
RUN npm run migrate:up 1631673778949-UseInformationFreq.ts
RUN npm run migrate:up 1631673787202-UseInformationTemp.ts
RUN npm run migrate:up 1631673796328-UseInformationN.ts
CMD ["npm", "run", "start:prod"]