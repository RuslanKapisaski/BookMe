# Development steps

---

### 1. Initialize project

- [x] Initialize project 'npm i --yes'
  - [x] Change module system
  - [x] Add start file (in src folder)
  - [x] Add dev script ('node --watch src/index.js')
  - [x] Config debbuger

---

### 2. Express

- [x] Install express
- [x] Initialize express server
- [x] Add server middlewares
  - [x] express.json – parse JSON body of requests
  - [x] express.urlencoded – parse HTML form data
  - [x] cors – enable Cross-Origin Resource Sharing

---

### 3. Database

- [x] Install Mongoose
- [x] Connect to databse
- [x] Error hadling (try-catch) on connecting db
- [x] Add basic models:
  - [x] Add User model
    - [x] Create virtual repeatPassword on pre validate and check for missmatch
    - [x] Hash password on pre save(bcrypt)
  - [x] Add Property model
  - [x] Add Review model
  - [x] Add Booking model
    - [x] Create custom validator for checking end and start dates

---

### 5. Register

- [x] Create user service
  - [x] Validate if user exists
  - [x] Generate token

### 6. Login

- [x] Create login service
- [x] Validate if user exists
- [x] Validate if user password is the same
- [x] Generate token

### 6. Users

- [x] Create user controller
  - [x] Create register endpoints
  - [x] Create login endpoints
  - [x] Install cookie-parser for creating cookies

### 6. Properties

- [x] Create property service
- [x] Create property controller

### 7. Reviews

- [x] Create review service
- [x] Create review controller

### 6. Bookings

- [x] Create booking service
- [x] Create booking controller

##### Nice to have

- [x] Patch functionality
