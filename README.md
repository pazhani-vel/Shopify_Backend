# 🛒 Shopify Backend API

A robust and scalable E-Commerce Backend built using Node.js, Express.js, MongoDB, and JWT Authentication. This project provides RESTful APIs for user authentication, product management, category management, cart operations, orders, notifications, and user profile management.

---

## 📌 Overview

This project serves as the backend for an e-commerce application similar to Shopify. It follows a modular architecture and provides secure APIs for handling users, products, categories, carts, orders, and notifications.

The backend is designed to be scalable, maintainable, and easy to integrate with React, Next.js, or any frontend framework.

---

## 🗂️ Project Structure

```bash
Shopify_Backend/
│
├── Config/
│   └── dbConnection.js
│
├── Controllers/
│   ├── AuthenticationController.js
│   ├── UserController.js
│   ├── ProductController.js
│   ├── CategoryController.js
│   ├── CartController.js
│   ├── OrderController.js
│   └── NotificationController.js
│
├── Middleware/
│   ├── AuthMiddleware.js
│   └── ErrorHandler.js
│
├── Models/
│   ├── UserModel.js
│   ├── ProductModel.js
│   ├── CategoryModel.js
│   ├── CartModel.js
│   ├── OrderModel.js
│   └── NotificationModel.js
│
├── Routes/
│   ├── Authentication.js
│   ├── User.js
│   ├── Product.js
│   ├── Category.js
│   ├── Cart.js
│   ├── Order.js
│   └── Notification.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Features

### 🔐 Authentication & Authorization

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Role-Based Access Control (Admin/User)

### 👤 User Management

* Get User Profile
* Update User Information
* Manage User Addresses
* Wishlist Management

### 📦 Product Management

* Create Products
* Update Products
* Delete Products
* Get Single Product
* Get All Products
* Product Search & Filtering

### 🏷️ Category Management

* Create Categories
* Update Categories
* Delete Categories
* View Categories

### 🛒 Cart Management

* Add Products to Cart
* Remove Products from Cart
* Update Product Quantity
* View Cart Items

### 📋 Order Management

* Place Orders
* View User Orders
* Update Order Status
* Order History

### 🔔 Notification System

* Get Notifications
* Mark Notification as Read
* Mark All Notifications as Read

---

## 🧠 Technologies Used

| Technology            | Purpose                         |
| --------------------- | ------------------------------- |
| Node.js               | Backend Runtime                 |
| Express.js            | API Framework                   |
| MongoDB               | Database                        |
| Mongoose              | ODM for MongoDB                 |
| JWT                   | Authentication                  |
| bcrypt.js             | Password Hashing                |
| express-async-handler | Async Error Handling            |
| dotenv                | Environment Variable Management |
| cors                  | Cross-Origin Requests           |

---

## 🚀 How It Works

### 1. User Authentication

Users register and login using email and password.

Passwords are securely hashed using bcrypt before being stored in MongoDB.

JWT tokens are generated upon successful login.

### 2. Authorization

Protected routes verify JWT tokens through middleware.

Only authorized users can access sensitive resources.

### 3. Product & Category Management

Admins can manage products and categories.

Users can browse products and categories through public APIs.

### 4. Cart & Orders

Users can add products to their cart and place orders.

Order information is stored and managed through dedicated APIs.

### 5. Notifications

The notification system keeps users informed about important events such as order updates.

---

## 📋 Prerequisites

Before running the project, ensure you have:

* Node.js v18+
* MongoDB Atlas or Local MongoDB
* Git
* Postman (Optional)

---

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret_key
```

---

## 📦 Installation

### Clone Repository

```bash
git clone https://github.com/pazhani-vel/Shopify_Backend.git
```

### Navigate to Project

```bash
cd Shopify_Backend
```

### Install Dependencies

```bash
npm install
```

---

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm start
```

Server runs on:

```bash
http://localhost:5000
```

---

## 🔗 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Users

```http
GET    /api/users/profile
PUT    /api/users/profile
```

### Categories

```http
POST   /api/categories
GET    /api/categories
PUT    /api/categories/:id
DELETE /api/categories/:id
```

### Products

```http
POST   /api/products
GET    /api/products
GET    /api/products/:id
PUT    /api/products/:id
DELETE /api/products/:id
```

### Cart

```http
POST   /api/cart
GET    /api/cart
PUT    /api/cart/:id
DELETE /api/cart/:id
```

### Orders

```http
POST   /api/orders
GET    /api/orders
PUT    /api/orders/:id
```

### Notifications

```http
GET    /api/notifications
PUT    /api/notifications/read/:id
PUT    /api/notifications/read-all
```

---

## 🧪 Testing APIs

You can test the APIs using:

* Postman
* Thunder Client
* Insomnia

Example:

```http
POST /api/auth/login
Content-Type: application/json

{
  "email":"user@example.com",
  "password":"123456"
}
```

---

## 📈 Future Improvements

* Payment Gateway Integration
* Product Reviews & Ratings
* Image Upload with Cloudinary
* Advanced Search & Filters
* Coupon & Discount System
* Inventory Management
* Admin Dashboard
* Real-Time Notifications
* Email Verification
* Forgot Password Functionality

---

## 🎯 Learning Outcomes

This project demonstrates:

* REST API Development
* Authentication & Authorization
* MongoDB Data Modeling (DataBase Schema)
* Backend Architecture Design
* Middleware Implementation
* Error Handling
* JWT Security
* E-Commerce Backend Development

---

## 👨‍💻 Author

**Pazhani Vel B**

GitHub: https://github.com/pazhani-vel

---

## 📄 License

This project is licensed under the MIT License.

Feel free to fork, modify, and use this project for learning and development purposes.
