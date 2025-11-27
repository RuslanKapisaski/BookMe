# Development steps

---

### 1. Initialize project

- [x] Initialize project 'npm i --yes'
  - [x] Change module system
  - [x] Add start file (in src folder)
  - [x] Add dev script ('node --watch src/index.js')
  - [x] Config debbuger

### 2. Express

- [x] Install express
- [x] Initialize express server
- [x] Add server middlewares
  - [x] express.json – parse JSON body of requests
  - [x] express.urlencoded – parse HTML form data
  - [x] cors – enable Cross-Origin Resource Sharing

### 3. Database

- [x] Install Mongoose
- [x] Connect to databse
- [x] Error hadling (try-catch) on connecting db
- [x] Add basic models:
  - [x] Add User model
    - [x] Create virtual repeatPassword on pre validate and check for missmatch
    - [x] Hash password on pre save(bcrypt)
