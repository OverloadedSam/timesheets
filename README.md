# Timesheet App

Timesheets app offers a comprehensive solution for managing employee time and tasks. With a clear hierarchy in place, the app allows for different levels of user access, from administrators to employees.

Admins have the ability to create users, giving them the necessary permissions to manage timesheets for all employees. Managers can keep track of the timesheets for the employees under their supervision, giving them the ability to rate each timesheet from 0 to 5 stars. Once a rating has been given, the employee can no longer make modifications to the timesheet.

Employees, on the other hand, have limited access to the app, only being able to see and add tasks to their own timesheets. They are not able to make any changes to the timesheet once it has been rated by a manager.

In summary, Timesheet app offers a simple yet effective solution for managing employee time and tasks, providing users with the necessary permissions and access to carry out their responsibilities effectively.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

- Node.js >= 18.12.1
- NPM >= 8.19.2
- MongoDB

## Installation

1. Clone the repository

        $ git clone https://github.com/OverloadedSam/timesheets.git

2. Go to `frontend` and `backend` directory one by one and install dependencies with command shown at 3rd step.

        $ cd frontend/
        // And
        $ cd backend/

3. Install the dependencies


    $ npm install

## Configure App

You have to set the environment variables of your configuration before starting the app. find `.env.example` file to know more.

### 1. Environment variables for `frontend`

Create a `.env` file at `timesheets/frontend/` directory and set the following environment variables starting with prefix `VITE_`

    VITE_BASE_URL={api_url_of_the_backend} // e.g: http://localhost:8000/api

### 2. Environment variables for `backend`

Create a `.env` file at `timesheets/backend/` directory and set the following environment variables.

    PORT=8000 // You can set any port number that is available but make sure to correctly include it in frontend environment variables.
    BASE_PREFIX=/api
    DB_CONNECTION_STRING={your_mongodb_connection_uri}
    DB_NAME={mongodb_database_name}
    SALT=10
    SECRET={your_secret}

### 3. Seed the database with mock/sample data.

For populating the database with sample data, please use the following command to seed the database

    $ cd timesheets/backend // go to backend directory.
    $ npm run seed

After initializing the database, you can view a list of users and their login credentials for accessing the app. View `backend/seed.js` file to know more.

## Running The Project

### Start backend (Node API)

    $ cd timesheets/backend // go to backend directory
    $ npm run dev // run backend with hot reloading.
    // or you can run the backend with standard command
    $ node server.js

### Start Frontend (React app [VITE])

    $ cd timesheets/frontend // go to frontend directory
    $ npm run dev

## Deployment

The app can be deployed to a hosting platform such as Render or Heroku.

## Built With

- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
