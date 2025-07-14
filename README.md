# FoodieExpress
🍽️ FoodieExpress - Full Stack Food Ordering App

**FoodieExpress** is a modern, full-stack food ordering web application that provides a seamless experience for users to browse restaurants, view menus, and place orders online. It is designed with scalability, performance, and simplicity in mind, making it ideal for food delivery startups or educational full-stack development projects.

---

## 📖 About the Project

**FoodieExpress** allows users to:
- Register or login securely
- Browse a list of restaurants and food items
- Add items to a cart
- Place an order and track it

This project is built using **Angular** for a dynamic and responsive front end, and **Node.js with Express** for a robust and scalable back end. MongoDB is used as the primary database to store user data, restaurant info, and order details.

---

## ✨ Features

- 🔐 User Authentication (JWT)
- 🍴 Browse restaurants and food menus
- 🛒 Add items to cart and place orders
- 📦 Track order status (future feature)
- ⚙️ Fully responsive design for desktop and mobile
- 🌍 Modern UI with clean structure

---

## 🧱 Tech Stack

### 🔹 Frontend
- Angular 17+
- TypeScript
- HTML5 & CSS3

### 🔸 Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### 🔧 Dev Tools
- Visual Studio Code
- Postman (for API testing)
- Git & GitHub
- Nodemon (dev server reload)
- Concurrently (for dev)

---

## 🗂️ Project Structure

FoodieExpress/
│
├── .bolt/ 
│ └── config.json
│
├── server/ # Node.js Express backend
│ └── server.js
│
├── src/ # Angular frontend
│ └── app/
│ ├── global_styles.css
│ ├── index.html
│ └── main.ts
│
├── angular.json # Angular CLI config
├── package.json # Project dependencies
├── tsconfig*.json # TypeScript config
├── README.md # Project documentation
└── .gitignore # Git ignored files

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Angular CLI](https://angular.io/cli)
- Git (for cloning)

---

### 🔧 Installation

1. **Clone the repository**

```bash
git clone https://github.com/Haripriya3902/FoodieExpress.git
cd FoodieExpress
Install backend dependencies

bash
Copy
Edit
npm install
Install frontend dependencies

bash
Copy
Edit
cd src
npm install
Start the backend server

bash
Copy
Edit
npm run server
Start the Angular frontend

bash
Copy
Edit
cd src
ng serve
Open your browser at: http://localhost:4200

🧪 Available Scripts
Run in project root unless otherwise stated.

Script	Description
npm run server	Starts the backend server (server.js)
npm start	Starts Angular frontend (ng serve)
npm run dev	Starts both frontend and backend (via concurrently)

Note: Make sure ports (4200, 3000) are free.

Homepage

Restaurant list

Order page

Authentication page

👩‍🎓 Author
Haripriya Rasakatla
📧 Email: rasakatlaharipriya@gmail.com
🔗 GitHub: github.com/Haripriya3902
