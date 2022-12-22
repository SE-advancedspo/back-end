FROM node:latest as backend_deps
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --omit=dev


FROM backend_deps as backend
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]

