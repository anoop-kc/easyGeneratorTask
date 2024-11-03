# easyGeneratorTask

This is a task given from EasyGenerator as part of the interview process

The project contains both the frontend and backend codebase. Front end is created in react with typescript and tailwind css. The back end is created in Nestjs

## Running the app

if you are using docker, you can run the whole project in a single command using

```bash
docker compose up --build
```

from the root folder of the project (outside of frontend and backend folders).

to restart the containers

```bash
docker-compose down
docker compose up --build
```

after the docker containers are successfully created, the project will be available at [http://localhost](http://localhost)

### API

The api url will be available at [http://localhost:3001](http://localhost:3001)

### API documentation

A swagger documentation of the API endpoints is available at [http://localhost:3001/apidocs](http://localhost:3001/apidocs)

### To stop the application

Type

```bash
docker-compose down
```

or you can alternatively type ctrl + c from the terminal where the docker containers are running

# To run the frontend and backend projects individually

## Front end

in terminal from the project root folder, type

```bash
cd frontend
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Back end

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
