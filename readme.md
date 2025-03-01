# Project Setup Guide

This guide will walk you through the steps to clone, install, and run the project on your local machine.

### Step 1: Clone the Repository

git clone https://github.com/tarunkatariaonline/auth-backend.git

### Step 2: Install Dependencies

cd auth-backend
npm install / npm i

### Step 3: Run the Project

npm run dev

## Available Routes

The following routes are already implemented in the project:

- **POST** `/register`  
  Register a new user.

- **GET** `/login`  
  Login an existing user.

- **GET** `/profile`  
  Get the user's profile (requires authentication).

- **PUT** `/changepassword`  
  Change the user's password (requires authentication).

- **PUT** `/updateprofile`  
  Update the user's profile (requires authentication).

- **GET** `/forgetpassword`  
  Send a password reset email.

- **PUT** `/forgetpasswordupdate`  
  Update the password using the reset token.
