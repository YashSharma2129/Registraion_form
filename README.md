# Login & Registration Form with MERN stack

## 👋 Introduction

A responsive user Registration and Login (SignIn & SignUp) form built using the MERN stack: React, Node.js, Express.js, and MongoDB, styled with Bootstrap and Tailwind CSS.  
This project allows users to register, log in, and view/edit/delete user data in a user-friendly interface.

## 🚀 Features

- User registration with validation
- Secure password hashing (bcrypt)
- User login with authentication
- View, edit, and delete registered users
- Responsive UI with Bootstrap and Tailwind CSS
- MongoDB for persistent storage

## ❓ Requirements

- [Node.js](https://nodejs.org/en/download) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)

## ⚙️ Installation & Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/Registration_form.git
cd Registration_form
```

### 2. Setup the Backend

```bash
cd backend
npm install
npm start
```
- The backend server will run on `http://127.0.0.1:3001/` by default.

### 3. Setup the Frontend

```bash
cd ../frontend
npm install
npm run dev
```
- The frontend will be available at `http://localhost:5173/`

## 📝 Usage

- Register a new user via the registration form.
- Log in with your credentials.
- View the list of users, edit or delete users as needed.

## 🛠️ Technology Used

- [React](https://reactjs.org) & [React Router](https://reactrouter.com/) (Frontend)
- [Express](http://expressjs.com/) & [Node.js](https://nodejs.org/en/) (Backend)
- [MongoDB](https://www.mongodb.com/) (Database)
- [Bootstrap](https://getbootstrap.com/) & [Tailwind CSS](https://tailwindcss.com/) (Styling)
- [Axios](https://axios-http.com/) (HTTP requests)
- [bcrypt](https://www.npmjs.com/package/bcrypt) (Password hashing)

## 📄 Project Structure

```
Registration_form/
  ├── backend/
  │   ├── models/
  │   ├── index.js
  │   └── package.json
  ├── frontend/
  │   ├── src/
  │   ├── index.html
  │   └── package.json
  └── README.md
```

## 🙌 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## ⭐ License

This project is open source and available under the [MIT License](LICENSE).

---

<h2>Don't forget to give a star! ⭐🤗</h2>
