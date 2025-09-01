# 📝 To-Do Task Management App

A small full-stack project built with **.NET Core (backend)**, **EF Core In-Memory/SQLite (data persistence)**, and **React (frontend)**.  

This project demonstrates:
- Clean API design with .NET Core
- Data structure design using EF Core
- Frontend component design in React
- Communication between frontend and backend
- Clean code, architecture, and documented thought process

**Assumptions**
- It is assumed that the user will enter valid email and password during registration
- There is no media (files, videos, images, etc.,) in the To Do items

The app provides basic task management functionality (create, list, complete, and delete tasks) and includes notes on trade-offs, assumptions, and future scalability considerations.
```
📁Folder structure

to-do-app/
├── backend/
│   └── ToDoAPI/ToDoAPI
│       ├── Controllers/
│       ├── Models/
│       ├── Program.cs
│       └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
└── README.md
```
Each of 🎨**frontend** and ⚙️**backend** folders have their individual README.md file with detailed instructions on how to build and test the applications.
```
🌐 The frontend React application has been created using Vite, so it runs by default on http://localhost:5173
🛢️ The backend .Net 9 application runs on http://localhost:5106, but observe the localhost base URL shown in [info] messages in the terminal when the project is run 
```
## 🚀 Production-Ready MVP Justification

This project is designed and implemented as a **Production-Ready MVP** (Minimum Viable Product).  
It provides the essential functionality for a real-world application while maintaining clean, scalable architecture.

---

### ✅ Backend (API)
- Built with **.NET Core** → a production-grade backend framework.
- Uses **Entity Framework Core** with SQLite (easily swappable with SQL Server or Postgres for production).
- Exposes **RESTful API endpoints** for:
  - User Registration & Login (basic authentication).
  - Full CRUD operations for **To-Do items**.
- **CORS enabled** for frontend ↔ backend communication.
- Separation of concerns: `Controllers`, `Models`, `Data` for maintainability.

🔒 **MVP Production Feature:** Authentication ensures users only manage their own tasks.

---

### ✅ Frontend (React + Vite)
- Developed with **React (Vite)** for fast development and production builds.
- Organized with reusable components (`Login`, `Register`, `TodoList`, `TodoItem`).
- Connects to backend via **Axios** for API calls.
- Provides:
  - User login/logout handling with JWT persistence.
  - Interactive To-Do management: Add, update (mark complete/incomplete), and delete tasks.
- Styled with **Tailwind CSS** (or fallback CSS) for a clear and usable interface.

📱 **MVP Production Feature:** Browser-ready and responsive design for accessibility.

---

### ✅ Communication Layer
- Frontend ↔ Backend wired via **REST APIs**.
- Basic error handling included.
- Secure **CORS configuration** for smooth integration.

---

### ✅ Clean Code & Scalability
- Clear folder structure:
  - Backend: `Controllers`, `Models`, `Data`, `Migrations`.
  - Frontend: `components`, `services`, `pages`.
- Extensible design (easy to add features like priorities, due dates, search/filter).
- **README** documents setup, assumptions, and future improvements.

---

### ⚖️ Trade-offs & Assumptions
- Authentication uses a lightweight approach (not OAuth or Identity Server).
- Data persistence is handled via **SQLite** (simple for demo; can swap to enterprise DB).
- Styling is minimalistic but usable.
- Deployment not pre-configured (assumes local environment).

---

### 🚀 Why It’s MVP-Ready
- **Users can register, log in, and manage their own tasks.**
- **Backend is robust and follows RESTful standards.**
- **Frontend is functional, styled, and communicates with backend APIs.**
- **Architecture is scalable** and ready for production deployment.

👉 With minimal setup, this project can be deployed to production (e.g.,  
- Backend on **Azure/Render/Heroku**,  
- Frontend on **Vercel/Netlify**),  
providing a fully functional MVP experience.

🙋**For questions or discussion**
```
📧 Email : uroosa.muheet@gmail.com 
```
