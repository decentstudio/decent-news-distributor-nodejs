# decent-news-distributor-nodejs
This service passes information from the queue to client applications.

## Commands
- `npm run build` - builds the project
- `npm run start`- builds the project (must be run after build has been run first time)
- `npm run build-start` - builds then starts the project
- `npm run watch` - starts the project and rebuilds/restarts when changes are made

## Development Guide
To run and make changes to this service locally: 

1. Run a rabbitmq container with ports 5672 and 15672 published.
    - `docker run -d --name=rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management-alpine`

2. Make a .env file if you don't have one. Copy/paste the .env.example contents into this file, but change `RABBBITMQ_HOST` to `localhost` instead of `rabbitmq`. (This is so your local distributor app can connect to your rabbitmq container.)

3. Run the distributor app in watch mode so any changes your make will cause the app to be rebuilt and restarted.
    - `npm run watch`