# 381project-G50
- This a group project of COMPS381 Autumn 2024
## Project info: 
- An Online Library Application
- Group information:
  - Group 50
    - WAIHUNG WONG TIM - Student ID: 13777082 <br />
    - LEE HON WING - Student ID: 13523057 <br />
    - CHOW KA HEI - Student ID: 12660865 <br />
              
              

## Project file intro:
- **server.js**:
  - This sets up an Express server with database connection to MongoDB using Mongoose and provide routing to parts of the application.
- **package.json**: 
  - This file contain the project's dependencies:
    - bcrypt
    - cookie-parser
    - ejs
    - express
    - express-sessuib
    - nobgiise
    - multer
- **public**: 
  - This folder contain a libray of uploaded ebooks
- **views**:
  - This folder contain a collections of EJS files for UI listed bellow:
    - addbooks.ejs, books.ejs, changeEmail.ejs, changeName.ejs, changePassword.ejs, deleteAccount.ejs, home.ejs, listbooks.ejs, listuser.ejs, login.ejs, profile.ejs, signup.ejs
- **models**: 
  - This folder contains model class representing data structure
  - File Discription:
      - bookdata.js:
        - Define the book information like Author, Title, ISBN, Publisher, etc
      - userborrowedbooks.js :
        - Define the borrowed book information like, ISBN, BorrowedDate, ExpiredDate, etc.
      - userinfo.js:
        - Define the user information like firstname, email, password, gender, etc.
- **Routes**:
  - This folder contain the routes handler to response to the request and allow user to sign up, login, view profiles, update information and manage user account.
  - File description:
    - book.js:
      -   Contain function related book such as Display and list books, Add book to the library, Get detail of books, hadling book borrow status
    - profile.js
      -   Manage users related routes such as update emails, passwords and names
    - user.js
      - Contain CRUD operations for managing user information
    - router.js
      - Contains routes that handling user login, logout and sign up

## The cloud-based server URL for testing: 
- https://deploygroup50.azurewebsites.net/

## Operation guides:
- the use of Login/Logout pages:
  -  Users have to first sign up for an account by filling their personal information, including First/Last name, email address, password and gender. Then users are allow to log in to their                                        online library account if they input the email and password properly. Otherwise, a message "Please fill out this field." will pop out to remind users.

- the use of your CRUD web pages:
  - which button or UI is used to implement create, read, update, and delete?

- the use your RESTful CRUD services:
  - the lists of APIs? HTTP request types? Path URI? How to test them? CURL testing commands?
