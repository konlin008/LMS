# LMS – Learning Management System

LMS (Learning Management System) is a full-stack web application that allows administrators to manage courses, instructors to upload content, and students to enroll and track their learning. It is built using a **React** frontend and a **Node.js, Express, and MongoDB** backend.

[Live Demo](https://lms-live.vercel.app/) – Try out the LMS platform live!

## Features

### Frontend

- User authentication (Login/Register)
- Role-based access: Admin, Instructor, Student
- Course creation, editing, and deletion (Admin/Instructor)
- Course enrollment and progress tracking (Student)
- Real-time feedback using **React Toastify**
- Dashboard views for different user roles
- Responsive UI with **Tailwind CSS**

### Backend

- Secure authentication using **bcrypt** and **JWT**
- Role-based authorization for protected routes
- RESTful API endpoints for managing users and courses
- Input validation with **Zod**
- MongoDB models with **Mongoose**
- Environment-based configuration with **dotenv**

## Tech Stack

### Frontend

- React
- React Router DOM
- Redux & RTK Query
- Axios
- Tailwind CSS
- React Toastify
- Vite

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt
- JWT
- Zod
- dotenv
- CORS

## Installation & Setup

### Prerequisites

- Node.js and npm installed

### Clone the Repository

```bash
git clone https://github.com/konlin008/LMS.git
cd LMS
```

To run the backend:

```bash
cd backend
npm install
npm run dev  # or use nodemon
```

To run the frontend:

```bash
cd frontend
npm install
npm run dev
```
