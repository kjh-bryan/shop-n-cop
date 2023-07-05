FROM node:18

# # Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/app/

RUN npm install

ENV SERVER_PORT="9090"
ENV MONGODB_URI="mongodb+srv://activate-hackers:UPzTOiEHZH4NbfDI@shop-n-cop.yo2hbem.mongodb.net/?retryWrites=true&w=majority"
ENV SERPAPI_API_KEY="91225421736e855b925bc625290f3602bfe2707e3e78b2501dc5945085493058"
ENV APIVERSION="2.0"


# Bundle app source
COPY . /usr/src/app/

EXPOSE 9090
CMD [ "npm", "run", "dev" ]

