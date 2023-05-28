## Building the Docker Image
Our image can be built with the following command. Note that we need to provide an `NPM_TOKEN` in order to install our private modules.

```
docker build -t minibar/supplier-dashboard --build-arg NPM_TOKEN={INSERT TOKEN HERE} .
```

## Environment Variables
All environment variables should be externalized. It's recommended that you maintain `.env` files for each environment such as `.env.development`, `.env.production` etc.

The correct environment variables can be supplied to the `docker run` command.


## Running in Development Mode
To run in development mode, use the following command. You can find your Docker Image ID using the `docker images` command.

```
docker run -i -t -p 3000:3000 --env-file=./.env.development {DOCKER IMAGE ID} 
```

The dashboard should be accessible at http://localhost:3000.


## Running in Production

```
docker build -t minibar/supplier-dashboard ./ --build-arg app_env=production --build-arg NPM_TOKEN={INSERT TOKEN HERE}
docker run -i -t -p 3000:3000 --env-file=./.env.production {DOCKER IMAGE ID} 
```