# Leaky Bucket Challenge

## Overview

This project implements a simple rate-limiting API using the **Leaky Bucket** algorithm. The purpose is to control the number of requests a user (identified by IP address) can make within a certain time window, preventing abuse or excessive usage.

The API provides endpoints to:

- Register an IP address (creating a bucket with tokens).
- Allow users with tokens to register a user with name and email.
- Handle token consumption and validation.

The system uses MongoDB for persistence, storing IP addresses and their available tokens.

---

## Technologies Used

- Node.js with Express.js
- MongoDB with Mongoose ODM
- JavaScript (ES modules)
- dotenv for environment variables

---

## Project Structure

- `src/controllers/`: Contains API controllers (request handlers).
- `src/models/`: Mongoose schemas and models.
- `src/services/`: Business logic services.
- `src/routes/`: Express route definitions.
- `src/index.js`: Entry point of the app.

---

## Running the Project

1. Clone the repo:

```bash
git clone https://github.com/jacolussi/leaky-bucket-challenge.git
cd leaky-bucket-challenge
```

2. Install dependecies

```
npm install
```

3. Set up your .env file with the MongoDB connection string and any other variables needed. Example:

```
MONGODB_URI=mongodb://localhost:27017/yourdb
```
Or point to a Cluster

4. Run the app.

```
npm run dev
```

5. Register IP Address

- **Endpoint:**  
  `GET /`

- **Description:**  
  Registers the caller's IP address in the system with a default number of tokens.

- **Request:**  
  No request body is needed. The server detects the IP from the request headers.

- **Possible Responses:**  
  - `201 Created` — IP registered successfully  
  - `409 Conflict` — IP already registered

- **Testing with curl:**  
  Run this command in your terminal:

  ```bash
  curl -X http://localhost:3000/
  ```

6. Register User

- **Endpoint:**  
  `POST /users`

  - **Description:**  
  Creates a user on MongoDB with a default number of tokens.(10)
  When the API response = "You must provide the fields to create an user", 1 token will be removed.
  If you have 0 tokens, the API response will be: "You do not have enough tokens"

  - **Request:**  
  A body with as JSON containing name and email file.

  - **Possible Responses:**  
  - `201 Created` — User registered successfully  
  - `409 Conflict` — You must provide the fields to create an user

  - **Testing with curl:**  
  Run this command in your terminal:

  ```bash
  curl -X POST http://localhost:3000/users
  ```