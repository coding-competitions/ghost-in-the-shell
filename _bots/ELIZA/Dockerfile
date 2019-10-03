FROM node

WORKDIR /app

# Copy js wrapper and install dependencies
COPY . .
RUN npm i

CMD [ "node", "." ]