## View project

[8base-task-list.netlify.app](https://8base-task-list.netlify.app/)

## About the project

A private task list, featuring all CRUD operations, a cloud function web hook and a custom Material UI theme.

## Features

- [x] Full CRUD operations
- [x] Custom Cloud function
- [x] Amazon Cognito sign-in service
- [x] Custom MUI theme

## Screenshots

![desktop](https://user-images.githubusercontent.com/4708484/113367685-b5075c00-932a-11eb-9044-3de6fd90e728.jpg)

![phone](https://user-images.githubusercontent.com/4708484/113367689-b89ae300-932a-11eb-85c2-022534900fab.jpg)

## Running the App

To run the app, you're going to need to first install its dependencies.

```sh
$ npm install
```

- The [.env.local.example](./.env) file provides a template of the required environment variables.

All variables are collected from the workspace and get used to enable both authentication and api connectivity.

```sh
REACT_APP_8BASE_API_ENDPOINT=<workspace_endpoint>
REACT_APP_PROFILE_ID=<profile_id>
REACT_APP_CLIENT_ID=<client_id>
REACT_APP_CLIENT_DOMAIN=<client_domain>
```

## Core dependencies

- [React](https://reactjs.org/) - Javascript library for building user interfaces.
- [8base](https://www.prisma.io/) - Next-generation backend-as-a-service for developers to build and run SaaS and market-facing applications.
- [Apollo](https://www.apollographql.com/) - Fully-featured, production ready caching GraphQL client for every UI framework and GraphQL server.
- [Material UI](https://material-ui.com/) - React component-based design system.
- [Date-fns](https://www.npmjs.com/package/date-fns) - Consistent toolset for manipulating JavaScript dates.
