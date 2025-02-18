# 🚗 DriveTest Booking System

## 📌 Project Overview

The **DriveTest Booking System** is a **full-stack web application** designed to manage **driving test appointments**. The platform allows users to **log in, book G and G2 tests, and manage appointments** through an interactive dashboard.

Developed as a **final individual college project**, this system demonstrates skills in **backend development, authentication, database integration, and responsive UI/UX design**.

---

## 🌍 Live Demo

🚀 **Try it out here**: [DriveTest Booking System Live Demo](https://drivetest-booking-system-production.up.railway.app/dashboard)

---

## 🚀 Features

- 🔦 **Dashboard** – Centralized view for users to manage appointments and bookings.
- 📝 **Appointment Booking** – Allows users to select dates and time slots for driving tests.
- 🔐 **User Authentication** – Role-based login for drivers, examiners, and admins.
- 🧑‍💼 **Admin Appointment Management** – Admins can select dates and enable specific time slots for G and G2 exams. Users will only see the available slots enabled by the admin.
- 📄 **Dynamic Forms** – Forms for G and G2 test bookings.
- 🧬 **Reusable Components** – EJS partials for consistent layout (e.g., header, footer).
- 🌍 **Responsive Design** – Optimized for various devices.
- 🎭 **Animations** – Enhanced user experience with smooth transitions.

---

## 🤦‍💻 Technologies Used

- **Front-End** → HTML5, CSS3, JavaScript, EJS
- **Back-End** → Node.js, Express.js
- **Database** → MongoDB
- **Styling** → CSS Animations, Responsive Design
- **Middleware** → Custom validation for session and user roles
- **Version Control** → Git/GitHub

---

## 🎯 Project Purpose

This project demonstrates:

- ✅ **Full-Stack Development** – Integration of front-end and back-end technologies.
- ✅ **Middleware & Validation** – Custom middleware for user authentication and role management.
- ✅ **Dynamic Templates** – Modular and reusable EJS templates.
- ✅ **Database Integration** – CRUD operations with MongoDB.
- ✅ **Admin Features** – Appointment management with date and slot availability.
- ✅ **Responsive Design** – Ensuring usability on various devices.

---

## 🐂 Project Structure

```
💽 drivetest_booking_system
 ├── 💽 css/                  # Stylesheets
 │   ├── appointment.css     # Appointment page styles
 │   ├── dashboard.css       # Dashboard styles
 │   ├── g_exams.css         # Styles for G and G2 exam pages
 │   ├── login.css           # Login page styles
 │   └── style.css           # Global styles
 ├── 💽 js/                   # JavaScript files (Controllers, Routes, Middleware)
 │   ├── appointment_controller.js
 │   ├── dashboard_controller.js
 │   ├── g2_exam_controller.js
 │   ├── g_exam_controller.js
 │   ├── login_controller.js
 │   ├── logout_controller.js
 │   ├── validsession_middleware.js
 │   ├── validusertypeadmin_middleware.js
 │   └── validusertypedriver_middleware.js
 ├── 💽 models/               # MongoDB Models
 │   ├── AppointmentModel.js
 │   └── UserModel.js
 ├── 💽 views/                # EJS Views
 │   ├── partials/           # EJS Partials (header, footer, etc.)
 │   ├── appointment.ejs
 │   ├── dashboard.ejs
 │   ├── g2_exam.ejs
 │   ├── g_exam.ejs
 │   └── login.ejs
 ├── 💽 public/               # Static Assets
 │   └── images/             # Images for the website
 ├── 📝 app.js                # Main Express application
 ├── 📝 .env                  # Environment variables
 └── 📝 package.json          # Dependencies and scripts
```

---

## 📌 Prerequisites

To run the project, ensure you have:

- **Node.js** and **npm** installed.
- **MongoDB** database running locally or in the cloud.

---

## 🏃‍♂️ How to Run

1️⃣ Clone the repository:
```bash
git clone https://github.com/jjacoboflorez95/drivetest-booking-system.git
```

2️⃣ Navigate to the project directory:
```bash
cd drivetest-booking-system
```

3️⃣ Install dependencies:
```bash
npm install
```

4️⃣ Set up environment variables in a `.env` file:
```plaintext
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<database>?retryWrites=true&w=majority
```

5️⃣ Start the application:
```bash
npm start
```

6️⃣ Open your browser and navigate to:
```plaintext
http://localhost:4040
```

---

## 📝 License

This project was developed for **educational purposes** as part of a **college final project**.

---

## 💼 Author

👤 **Juan Jacobo Florez Monroy**  
🌐 **Portfolio**: [jjacobo95.com](https://jjacobo95.com)  
🐙 **GitHub**: [github.com/jjacoboflorez95](https://github.com/jjacoboflorez95)