# adminjs_demo

# OAKS Admin Panel (AdminJS + PostgreSQL)

This project is a **custom Admin Dashboard** built using **AdminJS**, **Express**, and **PostgreSQL**, designed to view and manage data safely in production.  
---

## Features

- ✅ **AdminJS Integration** with PostgreSQL  
- ✅ **Role-based Access Control (RBAC)** – read-only database configuration with user and admin role.The admin can only   edit the records of user table.
- ✅ **Dynamic Resource Mapping** – Automatically maps Sequelize models to AdminJS resources  
- ✅ **Lightweight Express Server** – Runs locally or in Docker  
- ✅ **Secure Login & Session Handling**

---

#steps to run project:
1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/oaks_adminjs.git
   cd oaks_adminjs

2.Install dependencies:
  npm install

3.Ensure React is installed (required by AdminJS frontend bundler):
  npm install react react-dom

4.Set environment variables in .env:

    DATABASE_URL=postgres://username:password@localhost:5432/yourdb
    ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=yourpassword
    SESSION_SECRET=supersecret
    PORT=3000

5.Run the app locally:
  npm start
  
6.Then open:
  http://localhost:3000/admin
