📘BookMe

---

> 🏨 Overview

BookMe is a Single Page Application (SPA) built with React.js, designed for listing, renting, and managing properties such as apartments, rooms, and vacation homes.
Users can browse all listings publicly, while registered users gain access to personalized features such as creating, editing, and deleting their own properties.

The project fully covers all ReactJS requirements, including routing, authentication, guarded routes, CRUD operations, dynamic pages, and external API integration for image uploads.

---

> 🛠️ Technologies Used
> Frontend

React.js

React Router

Context API (or Redux)

Custom Hooks

CSS / TailwindCSS

Framer Motion (optional animations)

Cloudinary API (image uploads)

Backend

(Not graded in the exam, but necessary for the real functionality)

Node.js + Express

MongoDB + Mongoose

JWT Authentication

## Cloudinary Upload API

> 📂 Application Structure
> Public Pages

Home

Catalog

Property Details

Login

Register

Private Pages

Create Property

Edit Property

My Properties

Profile

Favorites

## Logout

> 🔐 Authentication & Guards

Guests can browse the catalog and view property details

Guests cannot create, edit, or delete properties

Logged-in users cannot access Login/Register

## Only the owner can edit or delete their own listings

> 🧩 Functionality
> ✔ CRUD Operations

Create Property – logged-in users can publish listings

Read – public catalog and dynamic details pages

Update – the creator can edit their own listings

Delete – the creator can delete their own listings

✔ Real-time Image Uploads

Handled via Cloudinary API, storing uploaded images as URLs.

✔ Form Validation

Validates email, password, title, price, capacity, etc.

Friendly error messages

✔ Error Handling

Frontend & backend error management

Invalid token handling

## Forbidden access (403)

> 🌐 Routing

The application uses React Router with dynamic routes, including:

/catalog

/catalog/:propertyId

/create

/edit/:propertyId

/profile

/login

/register

---

> 🚀 How to Run the Project

1. Install dependencies
   npm install

2. Start the development server
   npm run dev

3. Start the backend
   cd backend
   npm install
   npm start
   `

👤 Author

Ruslan Kapisaski
React.js
