# LMS – Learning Management System

**A production-ready MERN stack learning platform** that bridges the gap between instructors and students. This project demonstrates how to build a scalable, secure, and user-centric SaaS application with real-world workflows, role-based access control, and clean architecture patterns.

🔗 **[Live Demo](https://lms-buwm.vercel.app/)** – Experience the platform in action

---

## 📋 Project Overview

LMS is a full-featured Learning Management System built for real-world use. Students discover and enroll in courses, preview content before committing, and track learning progress. Instructors manage course content and monitor student engagement. Admins oversee the entire platform. The application emphasizes **security**, **scalability**, and **user experience**.

**What makes this stand out:**

- Built as a production-ready product, not a prototype
- Real-world preview-before-enroll workflow
- Enterprise-grade authentication and authorization
- Clean separation of concerns with modular architecture

---

## 🚀 Tech Stack

| Layer          | Technologies                                                   |
| -------------- | -------------------------------------------------------------- |
| **Frontend**   | React, Redux Toolkit, RTK Query, Tailwind CSS, shadcn/ui, Vite |
| **Backend**    | Node.js, Express.js, Mongoose                                  |
| **Database**   | MongoDB                                                        |
| **Security**   | JWT, bcrypt, CORS                                              |
| **Deployment** | Vercel (frontend)                                              |

---

## ✨ Core Features

### 🎓 Student Experience

- Search, filter by category, and sort courses (price: low→high, high→low)
- Enroll in free and paid courses
- Free preview: First 2 tutorial videos accessible before enrollment
- Track learning progress and course completion
- Responsive design with dark mode support

### 👨‍🏫 Instructor Dashboard

- Create and manage courses
- Upload tutorial content with structured sections
- Track enrolled students and monitor engagement
- View revenue and enrollment analytics

### 🔐 Admin Controls

- Manage users (Admin, Instructor, Student roles)
- Oversee all courses and content
- Monitor platform activity

### 🛡️ Security & Architecture

- **Role-based access control (RBAC)**: Protected routes on frontend and backend
- **Secure authentication**: JWT tokens with refresh mechanisms
- **Password hashing**: bcrypt for secure credential storage
- **Input validation**: Server-side validation for all API endpoints
- **Protected API endpoints**: Authorization middleware on all sensitive routes

---

## 🏗️ Architecture & Workflow

```
LMS (MERN Stack)
├── client/          # React + Redux frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Redux slices & RTK Query services
│   │   ├── pages/         # Route-based pages
│   │   └── store/         # Redux configuration
│   └── package.json
│
└── server/          # Node.js + Express backend
    ├── models/          # Mongoose schemas
    ├── routes/          # API endpoints
    ├── middleware/      # Auth, validation, error handling
    ├── controllers/     # Business logic
    └── package.json
```

### User Flow

1. **Authentication**: Register/Login with bcrypt-hashed passwords → JWT token issued
2. **Course Discovery**: Browse, filter, and sort courses (student view)
3. **Preview & Enrollment**: Watch free preview videos → Enroll in course
4. **Learning**: Access full course content post-enrollment → Track progress
5. **Instructor View**: Manage courses and monitor student enrollment

---
## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16+) and npm installed
- MongoDB Atlas account (or local MongoDB)

### Clone & Install

```bash
git clone https://github.com/konlin008/LMS.git
cd LMS
```

### Backend Setup

```bash
cd server
npm install
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000` (default).

---

## 🔑 Environment Variables

### Backend (`.env`)

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
PORT=5000
CORS_ORIGIN=http://localhost:5173
```

### Frontend (`.env.local`)

```
VITE_API_URL=http://localhost:5000/api
```

⚠️ **Never commit `.env` files. Add them to `.gitignore`.**

---

## 📝 License

This project is open source and available under the MIT License.

---

**Questions or feedback?** Feel free to open an issue or reach out. Happy to discuss architecture decisions and design choices!
