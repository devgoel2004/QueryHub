# Queryhub - Connect, Ask and Learn

## Project Overview

QueryHub is a full-stack web application designed for developers and tech enthusiasts to ask, answer, and discuss programming-related questions. Users can create, filter, and manage questions while interacting with a community-driven knowledge base.

## Features

- User Authentication (Signup/Login) with JWT and Google Auth
- Ask, edit, delete and answer questions
- Tag, Date, Vote based filteration and search functionality
- Upvote and downVote system for questions and answers
- Role based access control (Admin & Users)
- Real-time notifications for new answers or mentions
- Secure backend with JWT and google auth
- Email notifications for user interactions.

# Tech Stack

## Frontend
- React.js
- React Router
- Axios
- Tailwind CSS
- React Data Table Component

## Backend
- Node.js
- Express.js
- JSON Web Token(JWT)for authentication
- Bcrypt for password hashing
- Nodemailer for email notifications
- Google Auth and Passport.js for Authentication

# Installation and Setup
1. Clone the repository

```sh
git clone https://github.com/devgoel2004/queryhub.git
cd queryhub
```

2. Setup Backend
```sh
cd backend
npm install
```
Create a .env file in the backend/ directory and add:

```sh
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```
Start a backend server:
```sh
npm start
```

3. Setup Frontend
```sh
cd frontend
npm install
npm run dev
```

# API Endpoints
## User Authentication
