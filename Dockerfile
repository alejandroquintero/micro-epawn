FROM ubuntu:latest
maintainer @alejandroQ

RUN apt-get update \
&& apt-get install --yes nodejs \
# && apt-get install --yes nodejs-legacy \
&& apt-get install --yes npm \
&& mkdir microservice
COPY . /microservice
WORKDIR microservice
RUN npm install \
&& npm install express-session \
&& npm install passport-auth0 \
&& npm install passport \
&& npm install connect-ensure-login
CMD ["npm","start"]
