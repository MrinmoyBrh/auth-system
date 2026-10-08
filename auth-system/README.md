# Node.js OTP & JWT Authentication System

A secure RESTful authentication backend built with Node.js, Express, MongoDB (Atlas), and JSON Web Tokens (JWT). Features password hashing with bcrypt and email OTP verification.

## Features

- **User Registration:** Collects user details, generates a temporary 6-digit OTP, and saves the hashed password.
- **Password Encryption:** Passwords salted and hashed via `bcryptjs` before writing to the database.
- **OTP Verification:** Validates time-sensitive one-time passwords within a 5-minute expiry window.
- **JWT-Based Login:** Issues signed bearer tokens for verified accounts.
- **Postman Ready:** Fully tested API endpoints for integration.

---

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas via Mongoose ODM
- **Security:** bcryptjs, jsonwebtoken
- **Environment Management:** dotenv

---

## Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/](https://github.com/)<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
cd <YOUR-REPO-NAME>