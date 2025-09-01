# ToDo API Backend (.NET 9)

A **ToDo Management API** built with **ASP.NET Core 9** and **Entity Framework Core**.  
The API provides JWT-based authentication, user management, and CRUD operations for ToDo items with priorities and due dates.  
Designed to integrate with a **React frontend**.

---

## 🚀 Features

- **User Authentication**
  - Register new users
  - Login with JWT-based authentication
- **ToDo Items**
  - Create, update, delete, and list ToDo items
  - Assign priority (`Low`, `Medium`, `High`)
  - Track due dates
  - Each item is automatically linked to the logged-in user
- **Data Integrity**
  - Enforced by `UserId` foreign key on `ToDoItem`
- **Security**
  - Passwords hashed with **BCrypt**
  - JWT tokens for stateless authentication

---

## 🛠️ Tech Stack

- **.NET 9 / ASP.NET Core Web API**
- **Entity Framework Core** (SQLite by default)
- **JWT Authentication**
- **BCrypt.Net** for password hashing
- **Swagger / OpenAPI** for API documentation

---

## 📂 Project Structure
```
ToDoApi/
│── Controllers/
│ ├── UserController.cs # User registration & login
│ ├── ToDoController.cs # CRUD for ToDo items
│
│── ToDoAPI.Infrastructure/
|   ├── Data/
│       ├── AppDbContext.cs # EF Core DbContext
|
│── ToDoAPI.Core/
|   │── Entities/
|        ├── User.cs     # User entity
|        ├── ToDoItem.cs # ToDoItem entity
|   │── Enums/
|        ├── PriorityLevel.cs # Priority levels - low, medium, high
|        ├── Statuses.cs      # Status values - Ready To Start, In Progress, Pending, Overdue, Done
|   │── Interfaces/
|        ├── IToDoService.cs      # ToDo service interface
|        ├── IUserService.cs      # User service interface
|   │── DTOs.cs         # Data Transfer Object for user registration, login and authentication
│
│── Services/
│ ├── ToDoService.cs # ToDo service implementation
│ ├── UserService.cs # User service implementation
│
│── Program.cs # App entry point
│── ToDoAPI.csproj # XML file containing dependencies and libraries
│── appsettings.json # JWT secret & DB config 

```

## ⚙️ Setup Instructions
- Before you build the project, set the ConnectionStrings attribute in appsettings.json to point to the location of a valid SQLite DB file
- Using DB Browser (SQLite), create a new database, say ToDo.db. Do not create any tables.
- The following steps will install dependencies and create Migrations folder in your project folder
- The migration files will help build the tables in the specified DB (location mentioned in ConnectionStrings)
### 1. Clone Repository
```sh
git clone https://github.com/UroosaMuheer/to-do-app.git
cd to-do-app
cd backend\ToDoAPI\ToDoAPI
dotnet build
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run 
```

**API will be available at: **
👉 http://localhost:5106/swagger/index.html
(Or, 👀look for the localhost base URL that is displayed in Terminal when the project is run)

Visit the above link for the Swagger OpenAPI documentation and instructions on how to use the API Endpoints

Register/create new user
Login using the username and password
Click on the 🔑Authorize button (top-right corner) to set the token that is returned upon successful login
Set the Authorization header as follows:

Bearer <token_value_received_from_login_response>

# 📸 Screenshots

 📖 Swagger Documentation page (/swagger/index.html)

<video controls src="20250901-1903-02.5181649.mp4" title="Title"></video>

  🔑Authorizing user
<video controls src="20250901-1905-17.7936059.mp4" title="Title"></video>
