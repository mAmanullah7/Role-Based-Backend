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
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

5. Start the server:
   ```
   npm start
   ```

## API Endpoints

### Authentication

- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Login an existing user.

### User Management

- **GET /api/users**: Retrieve user information.
- **PUT /api/users**: Update user profile.

### Role Management

- **POST /api/roles**: Add a new role.
- **PUT /api/roles/:id**: Edit an existing role.
- **DELETE /api/roles/:id**: Delete a role.

## License

This project is licensed under the MIT License.