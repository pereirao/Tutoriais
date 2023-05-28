FROM node:16-alpine3.14

LABEL vendor="Minibar Delivery"
LABEL maintainer="Minibar Delivery <tech@minibardelivery.com>"
LABEL name="Supplier Dashboard"
LABEL version="3.0"
LABEL description="Our dashboard for store partners to view and manage orders."

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env
ENV REACT_APP_CLIENT_ID $client_id
ENV REACT_APP_CLIENT_SECRET $client_secret
ENV REACT_APP_API_SERVER_URL $api_server_url
ARG NPM_TOKEN

RUN mkdir -p /frontend
WORKDIR /
COPY ./ ./

RUN yarn install
RUN rm -f .npmrc

CMD if [ ${APP_ENV} = production ]; \
	then \
	yarn global add http-server && \
	node scripts/build.js && \
  cd build && \
	hs -p 3000; \
	else \
	npm run start; \
	fi

EXPOSE 3000
