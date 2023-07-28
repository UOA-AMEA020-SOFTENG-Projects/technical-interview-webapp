# Stage 1: Python
FROM python:3.9-slim as python-stage

WORKDIR /usr/src/python

COPY ./sbert/sbert.py ./

# Installing python dependencies
RUN pip install --no-cache-dir sentence_transformers

# Stage 2: Node
FROM node:17

# Installing python again in the Node.js image
RUN apt-get update && apt-get install -y python3.9 python3-pip

# Create a symbolic link for Python
RUN ln -s /usr/bin/python3.9 /usr/bin/python

# Installing python dependencies in Node.js image
RUN pip install --no-cache-dir sentence_transformers

WORKDIR /usr/src/app

# Copies 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copies everything over to Docker environment
COPY . .

# Make sure python script is executable and in correct path
COPY --from=python-stage /usr/src/python/sbert.py ./sbert/sbert.py

# making sure that the sentencetransformer dependencies pre install, instead of when the endpoint is run
RUN python ./sbert/sbert.py --text1 "dummy text 11" --text2 "dummy text 12"

# Set necessary environments for Node.js
ENV NODE_ENV=production

# Expose correct port
EXPOSE 3000

# Command to run the app
CMD [ "npm", "start" ]
