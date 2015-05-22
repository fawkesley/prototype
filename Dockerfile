FROM ubuntu:14.04

# Update, Install Node.js and npm
RUN apt-get update
RUN apt-get install node -y
RUN apt-get install npm -y
RUN apt-get install git -y

# Bundle app
COPY ./ /

# Install app dependencies
RUN cd /; npm install

EXPOSE 3000
CMD ["nodejs", "/app/server/index.js"]