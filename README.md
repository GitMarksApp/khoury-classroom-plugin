<div align="center">
<h1>Khoury Classroom</h1>
  <div>
      A grading platform for TA's, by TA's
  </div>
</div>

## Stack

[![Go](https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white)](https://go.dev/doc/)
[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://camo.githubusercontent.com/3467eb8e0dc6bdaa8fa6e979185d371ab39c105ec7bd6a01048806b74378d24c/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f52656163742d3230323332413f7374796c653d666f722d7468652d6261646765266c6f676f3d7265616374266c6f676f436f6c6f723d363144414642)](https://react.dev/)

## Tools

[![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)

## Development Enviroment Setup

Please install the following software

[Go](https://go.dev/doc/install) our primary backend language.

[Node Package Manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
our package manager in the frontend.

[Docker](https://www.docker.com/get-started/) and
[Docker Desktop](https://www.docker.com/products/docker-desktop/) our Postgres
Database will be containerized in Docker.

[Ngrok](https://ngrok.com/docs/getting-started/) Allows us to easily connect the
frontend to backend code. Make an account for a stable link!

## Before Running

Create an .env file in the root directory:

```
APP_ENVIRONMENT=<LOCAL | PRODUCTION> (use LOCAL if loading env variables through .env file)
GITHUB_APP_PRIVATE_KEY=<Your GitHub app private key>
GITHUB_APP_ID=<Your GitHub app ID>
GITHUB_APP_INSTALLATION_ID=<Your GitHub app installation ID>
GITHUB_APP_WEBHOOK_SECRET=<Your GitHub app's webhook secret>
GITHUB_CLIENT_REDIRECT_URL=<The URL that GitHub should redirect back to>
GITHUB_CLIENT_ID=<The client ID of your GitHub OAuth app>
GITHUB_CLIENT_SECRET=<The client Secret of your GitHub OAuth app>
GITHUB_CLIENT_URL=<The Authorization endpoint of your OAuth provider>
GITHUB_CLIENT_TOKEN_URL=<The access token endpoint of your OAuth provider>
GITHUB_CLIENT_JWT_SECRET=<The Json Web Token secret>
DATABASE_URL=<Your database URL>
```

Create a second .env file in the frontend root directory:

```
VITE_PUBLIC_API_DOMAIN=<Your backend url>
VITE_GITHUB_CLIENT_ID=<The client ID of your GitHub OAuth app>
```



## Running The Project in A Dev Environment

1. Launch Docker Desktop
2. In the base of the repo: run `make db-run`
3. Then, open a new tab to run commands in: run `make backend-dep` then `make backend-run`
4. Next, in a new tab run `make ngrok-run`
5. Finally, open one last new tab: run `make frontend-run`


## Running locally in dev mode without using Make (due to multi-line env variable issues):

1. Launch Docker Desktop
2. (On first run) In the repo root: run `docker-compose -f docker-compose.dev.yaml build`
3. In the repo root: run `docker-compose -f docker-compose.dev.yaml up`
4. In a new terminal: run `ngrok http --domain={<ngrok public url>} 8080`
5. In a new terminal: run `cd frontend`
6. (On first run) In the frontend directory: run `npm i`
7. In the frontend directory: run `npm run dev`
