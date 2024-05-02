# Use an AWS Lambda base image
FROM public.ecr.aws/lambda/nodejs:20
WORKDIR /var/task
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "generate.handler" ]
