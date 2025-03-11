# Role-Based Access Control API

A RESTful API for role-based access control (RBAC) that allows administrators to create roles, assign roles to users, and manage permissions.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [User Management](#user-management)
  - [Role Management](#role-management)
- [Testing with Postman](#testing-with-postman)

## Features

- User authentication (signup, login)
- Role-based access control
- Role management (create, update, delete roles)
- User management (view, update user profiles)
- Permission-based authorization

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Role-Based-Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/role-based-auth
JWT_SECRET=your_jwt_secret_key
```

4. Seed the database with initial roles and admin user:
```bash
node src/utils/seedRoles.js
```

5. Start the server:
```bash
npm start
```

## Database Setup

The application uses MongoDB as its database. The database schema consists of:

### User Schema
```javascript
{
  name: String,
  email: String,
  password: String,
  gender: String,
  age: Number,
  role: ObjectId (reference to Role)
}
```

### Role Schema
```javascript
{
  name: String,
  permissions: [String]
}
```

The seed script creates the following default roles:
- `admin`: Has all permissions (`manage_users`, `manage_roles`, `view_dashboard`)
- `manager`: Has permissions (`manage_users`, `view_dashboard`)
- `user`: Has permission (`view_dashboard`)

It also creates a default admin user:
- Email: `admin@example.com`
- Password: `Admin@123`

## API Endpoints

### Authentication

#### Register a new user
- **URL**: `/api/auth/signup`
- **Method**: `POST`
- **Auth required**: No
- **Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "gender": "male",
  "age": 30
}
```
- **Success Response**: `201 Created`
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "male",
    "age": 30,
    "role": "user"
  }
}
```

#### Login
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Auth required**: No
- **Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **Success Response**: `200 OK`
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "male",
    "age": 30,
    "role": "user"
  }
}
```

#### Get User Profile
- **URL**: `/api/auth/profile`
- **Method**: `GET`
- **Auth required**: Yes (JWT token in Authorization header)
- **Success Response**: `200 OK`
```json
{
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "male",
    "age": 30,
    "role": "user"
  }
}
```

### User Management

#### Get User Profile
- **URL**: `/api/users/profile`
- **Method**: `GET`
- **Auth required**: Yes (JWT token in Authorization header)
- **Success Response**: `200 OK`
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "gender": "male",
  "age": 30,
  "role": "user"
}
```

#### Update User Profile
- **URL**: `/api/users/profile`
- **Method**: `PUT`
- **Auth required**: Yes (JWT token in Authorization header)
- **Body**:
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "gender": "male",
  "age": 31
}
```
- **Success Response**: `200 OK`
```json
{
  "id": "user_id",
  "name": "John Updated",
  "email": "john.updated@example.com",
  "gender": "male",
  "age": 31,
  "role": "user"
}
```

#### Get All Users (Admin Only)
- **URL**: `/api/users`
- **Method**: `GET`
- **Auth required**: Yes (JWT token in Authorization header with admin role)
- **Success Response**: `200 OK`
```json
[
  {
    "id": "user_id_1",
    "name": "Admin User",
    "email": "admin@example.com",
    "gender": "other",
    "age": 30,
    "role": {
      "id": "role_id",
      "name": "admin",
      "permissions": ["manage_users", "manage_roles", "view_dashboard"]
    }
  },
  {
    "id": "user_id_2",
    "name": "John Doe",
    "email": "john@example.com",
    "gender": "male",
    "age": 30,
    "role": {
      "id": "role_id",
      "name": "user",
      "permissions": ["view_dashboard"]
    }
  }
]
```

#### Assign Role to User (Admin Only)
- **URL**: `/api/users/assign-role`
- **Method**: `POST`
- **Auth required**: Yes (JWT token in Authorization header with admin role)
- **Body**:
```json
{
  "userId": "user_id",
  "roleId": "role_id"
}
```
- **Success Response**: `200 OK`
```json
{
  "message": "Role assigned successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "manager"
  }
}
```

### Role Management

#### Create a New Role (Admin Only)
- **URL**: `/api/roles`
- **Method**: `POST`
- **Auth required**: Yes (JWT token in Authorization header with admin role)
- **Body**:
```json
{
  "name": "editor",
  "permissions": ["edit_content", "view_dashboard"]
}
```
- **Success Response**: `201 Created`
```json
{
  "message": "Role created successfully",
  "role": {
    "id": "role_id",
    "name": "editor",
    "permissions": ["edit_content", "view_dashboard"]
  }
}
```

#### Get All Roles
- **URL**: `/api/roles`
- **Method**: `GET`
- **Auth required**: Yes (JWT token in Authorization header)
- **Success Response**: `200 OK`
```json
[
  {
    "id": "role_id_1",
    "name": "admin",
    "permissions": ["manage_users", "manage_roles", "view_dashboard"]
  },
  {
    "id": "role_id_2",
    "name": "manager",
    "permissions": ["manage_users", "view_dashboard"]
  },
  {
    "id": "role_id_3",
    "name": "user",
    "permissions": ["view_dashboard"]
  },
  {
    "id": "role_id_4",
    "name": "editor",
    "permissions": ["edit_content", "view_dashboard"]
  }
]
```

#### Get a Role by ID
- **URL**: `/api/roles/:id`
- **Method**: `GET`
- **Auth required**: Yes (JWT token in Authorization header)
- **Success Response**: `200 OK`
```json
{
  "id": "role_id",
  "name": "editor",
  "permissions": ["edit_content", "view_dashboard"]
}
```

#### Update a Role (Admin Only)
- **URL**: `/api/roles/:id`
- **Method**: `PUT`
- **Auth required**: Yes (JWT token in Authorization header with admin role)
- **Body**:
```json
{
  "name": "editor",
  "permissions": ["edit_content", "view_dashboard", "publish_content"]
}
```
- **Success Response**: `200 OK`
```json
{
  "message": "Role updated successfully",
  "role": {
    "id": "role_id",
    "name": "editor",
    "permissions": ["edit_content", "view_dashboard", "publish_content"]
  }
}
```

#### Delete a Role (Admin Only)
- **URL**: `/api/roles/:id`
- **Method**: `DELETE`
- **Auth required**: Yes (JWT token in Authorization header with admin role)
- **Success Response**: `200 OK`
```json
{
  "message": "Role deleted successfully"
}
```

## Testing with Postman

Here are some example Postman requests to test the API:

### 1. Register a new user

```
POST http://localhost:3000/api/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123",
  "gender": "male",
  "age": 25
}
```

### 2. Login

```
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Admin@123"
}
```

Save the token from the response for subsequent requests.

### 3. Create a new role (as admin)

```
POST http://localhost:3000/api/roles
Content-Type: application/json
Authorization: Bearer <your_token>

{
  "name": "content_creator",
  "permissions": ["create_content", "view_dashboard"]
}
```

### 4. Get all roles

```
GET http://localhost:3000/api/roles
Authorization: Bearer <your_token>
```

### 5. Assign a role to a user (as admin)

First, get all users to find the user ID:

```
GET http://localhost:3000/api/users
Authorization: Bearer <your_token>
```

Then, assign a role to a user:

```
POST http://localhost:3000/api/users/assign-role
Content-Type: application/json
Authorization: Bearer <your_token>

{
  "userId": "<user_id>",
  "roleId": "<role_id>"
}
```

### 6. Update a role (as admin)

```
PUT http://localhost:3000/api/roles/<role_id>
Content-Type: application/json
Authorization: Bearer <your_token>

{
  "name": "content_creator",
  "permissions": ["create_content", "edit_content", "view_dashboard"]
}
```

### 7. Delete a role (as admin)

```
DELETE http://localhost:3000/api/roles/<role_id>
Authorization: Bearer <your_token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages for different scenarios:

- `400 Bad Request`: Invalid input data
- `401 Unauthorized`: Authentication required or invalid credentials
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

Example error response:

```json
{
  "message": "Access denied: Insufficient permissions"
}
```

## Security Considerations

- Passwords are hashed using bcrypt before storing in the database
- JWT tokens are used for authentication
- Role-based access control is implemented for authorization
- Input validation is performed using express-validator