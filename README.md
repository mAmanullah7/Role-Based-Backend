# Role-Based Backend

This project is a Node.js backend application that implements role-based access control. It allows an admin to manage user roles, add roles and users, and enables user login and signup. The application uses MongoDB for data storage and implements JWT for authentication.

## Features

- User registration with name, email, gender, and age.
- User login with encrypted hashed passwords.
- Role management (admin, manager, moderator, etc.).
- Dashboard for users to view their roles.
- Middleware for authentication and role checking.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT (JSON Web Tokens)
- Bcrypt for password hashing

## Project Structure

```
role-based-backend
├── src
│   ├── config
│   │   ├── database.js
│   │   └── env.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── roleController.js
│   │   └── userController.js
│   ├── middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── roleCheck.js
│   ├── models
│   │   ├── Role.js
│   │   └── User.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   ├── roleRoutes.js
│   │   └── userRoutes.js
│   ├── utils
│   │   ├── encryption.js
│   │   └── validation.js
│   ├── app.js
│   └── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd role-based-backend
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Create a `.env` file in the root directory and add your MongoDB URI, JWT secret, and port:
   ```
   MONGODB_URI=
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

5. Start the server:
   ```
   npm start
   ```

## Deployment

The API is deployed on Vercel and can be accessed at:
- Base URL: https://role-based-backend-gamma.vercel.app

## API Endpoints

### Authentication

- **POST https://role-based-backend-gamma.vercel.app/api/auth/signup**: Register a new user.
- **POST https://role-based-backend-gamma.vercel.app/api/auth/login**: Login an existing user.

### User Management

- **GET https://role-based-backend-gamma.vercel.app/api/users/profile**: Retrieve user profile (requires authentication).
- **PUT https://role-based-backend-gamma.vercel.app/api/users/profile**: Update user profile (requires authentication).

### Role Management

- **POST https://role-based-backend-gamma.vercel.app/api/roles**: Add a new role (requires admin role).
- **GET https://role-based-backend-gamma.vercel.app/api/roles**: Get all roles (requires authentication).
- **PUT https://role-based-backend-gamma.vercel.app/api/roles/:id**: Edit an existing role (requires admin role).
- **DELETE https://role-based-backend-gamma.vercel.app/api/roles/:id**: Delete a role (requires admin role).

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

You can obtain a JWT token by logging in through the `/api/auth/login` endpoint.

## Testing the API

You can use tools like Postman or curl to test the API endpoints. For example:

```bash
# Login example
curl -X POST https://role-based-backend-gamma.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"your-email@example.com","password":"your-password"}'
```

## License

This project is licensed under the MIT License.