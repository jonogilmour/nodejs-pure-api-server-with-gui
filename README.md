# NodeJS API Server

Pure NodeJS API server with zero modules or frameworks, plus a working GUI webapp. This is a simple app, probably not suitable in production without modification.

## To Start

Before you begin, please create certificate/key .pem files and place them in a top level directory called `https`. Without these the HTTPS server will not start.

Then execute

```
node index.js
```

## Inner Workings

Please see [the API repo](https://github.com/jonogilmour/nodejs-api-server-userchecks) for more information on the API inner workings.

Renders very simple HTML templates with an equally simple front end JS library for communicating with the server.
