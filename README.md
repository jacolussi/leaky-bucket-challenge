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

1. Clone the repo and checkout the branch:

```bash
git clone https://github.com/jacolussi/leaky-bucket-challenge.git
cd leaky-bucket-challenge
git checkout fix/refactor
