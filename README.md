Here's a brief documentation for the server:

---

## Todo API Server Documentation

### Overview
This server manages users and their todos, implementing authentication using JWT. The API allows users to register, log in, and perform CRUD operations on todo items. Authorization is required for all todo-related operations.

### Technologies Used
- **Node.js**: Backend server
- **Express**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **bcrypt**: Password hashing
- **jsonwebtoken (JWT)**: Authentication via tokens
- **dotenv**: Environment variables

### Setup Instructions
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```
   JWT_SECRET=your_jwt_secret_key
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Routes and Endpoints

#### User Routes

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| POST   | `/users/register`  | Register a new user      |
| POST   | `/users/login`     | Log in an existing user  |

#### Todos Routes (Protected)

| Method  | Endpoint                       | Description                   |
|---------|---------------------------------|-------------------------------|
| GET     | `/todos`                        | Fetch all todos for the user  |
| POST    | `/todos/add`                    | Add a new todo                |
| PATCH   | `/todos/update/:todoId`         | Update a specific todo        |

### Request & Response Examples

#### 1. **Register User**
- **Endpoint**: `/users/register`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "message": "User registered successfully",
    "newUser": { "name": "John Doe", "email": "john@example.com", "password": "hashed_password" }
  }
  ```

#### 2. **Login User**
- **Endpoint**: `/users/login`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "message": "User logged in successfully",
    "token": "jwt_token"
  }
  ```

#### 3. **Get Todos (Authenticated)**
- **Endpoint**: `/todos`
- **Method**: GET
- **Headers**: 
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "data": [
      { "title": "Task 1", "isCompleted": false, "description": "Description 1" }
    ]
  }
  ```

#### 4. **Add Todo (Authenticated)**
- **Endpoint**: `/todos/add`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "title": "New Task",
    "description": "Task description",
    "priority": "High",
    "createdOn": "2024-09-18"
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "message": "Todo created successfully",
    "data": {
      "title": "New Task",
      "description": "Task description",
      "priority": "High",
      "createdOn": "2024-09-18"
    }
  }
  ```

#### 5. **Update Todo (Authenticated)**
- **Endpoint**: `/todos/update/:todoId`
- **Method**: PATCH
- **Request Body**:
  ```json
  {
    "title": "Updated Task",
    "isCompleted": true
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "message": "Todo updated successfully"
  }
  ```

### Authentication
JWT-based authentication is used. Tokens must be passed in the `Authorization` header for all routes that require authentication:
```
Authorization: Bearer <token>
```

### Error Handling
- **401 Unauthorized**: Returned when the user is not authenticated or the token is invalid.
- **403 Forbidden**: Returned when a user tries to update a todo they do not own.
- **500 Internal Server Error**: Returned for server-side issues.

### Environment Variables
- **JWT_SECRET**: Secret key for signing JWT tokens.
- **MONGO_URI**: MongoDB connection string.

---

Let me know if you'd like more details or adjustments!
