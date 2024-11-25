# 381project-G50
This is a group project of COMPS381 Autumn 2024.
## Project Information
An Online Library Application "**Online Library**".
- Group information:
  - Group 50
    - WAIHUNG WONG TIM - Student ID: 13777082
    - LEE HON WING - Student ID: 13523057
    - CHOW KA HEI - Student ID: 12660865

## Project file Introduction
- `server.js`
  - This sets up an Express server with a database connection to MongoDB using Mongoose and provides routing to parts of the application.

- `package.json`
  -  This file contains the project's dependencies:
    - bcrypt
    - cookie-parserV
    - ejs
    - express
    - express-sessuib
    - nobgiise
    - multer

- `public/`
  - A folder directory stores the resources for the application.
    - `public/`
      - `css/`: Contain the css style sheet for web pages presentation.
      - `uploadbooks/`: Stores the uploaded ebooks.

- `views/`
  - Contain a collection of EJS files for user interface.
    - `addbooks.ejs`
    - `books.ejs`
    - `changeEmail.ejs`
    - `changeName.ejs`
    - `changePassword.ejs`
    - `deleteAccount.ejs`
    - `home.ejs`
    - `listbooks.ejs`
    - `listuser.ejs`
    - `login.ejs`
    - `profile.ejs`
    - `signup.ejs`

- `models/`
  - This folder contains model class defines data structure for database.
    - `bookdata.js`
      - Define the book information like Author, Title, ISBN, Publisher, name(fileName), path(filePath), contentType
    - `userborrowedbooks.js`
      - Define the borrowed book information like, ISBN, Borrowed, ExpiredDate, etc.
    - `userinfo.js`
      - Define the user information like firstname, email, password, gender, etc.

- `Routes/`
  - Contain the routes handler to response to the request and allow user to sign up, login, view profiles, update information and manage user account.
    - `book.js`
      -   Contain function related book such as Display and list books, Add book to the library, Get detail of books, handling book borrow status
    - `profile.js`
      -   Manage users related routes such as update emails, passwords and names
    - `user.js`
      - Contain CRUD operations for managing user information
    - `router.js`
      - Contains routes that handling user login, logout and sign up

## Cloud-based Server URL
- https://deploygroup50.azurewebsites.net/

## Operation Guides for Server
### User flow
1. Login page:
   - Login Information
     - Username: Ko@gmail.com, Password: 1 (Admin)
     - Username: oo@oo, Password: 1 (User)
2. CURD Web Pages
   - Create: Use "Submit" button on Add book page to add book
   - Read: "List all books" button on the home page
   - Update: Edit profile information by clicking the "Edit" button on Profile page
   - Delete: Remove an account by pressing "Delete account" button on Profile page

3. RESTful CRUD Services and testing
   1. Set session
   - ```curl -c cookies.txt -d "email=Ko@gmail.com&password=1" https://deploygroup50.azurewebsites.net/```
   2. Testing command
      - Method GET
        - ```curl -b cookies.txt https://deploygroup50.azurewebsites.net/api/user/673f13ea8480fd3c43cc48e0 //673f13ea8480fd3c43cc48e0 is mongodb _id```
      - Method POST (Create user)
        - ```curl -X POST -b cookies.txt -H "Content-Type: application/json" -d '{"first_name":"John Doe","last_name":30,"email":"test@test","password":"1","gander":"Male","admin":"true"}' [http://localhost:8099/api/user](https://deploygroup50.azurewebsites.net/) //{"first_name":"John Doe","last_name":30,"email":"test@test","password":"1","gander":"Male","admin":"true"}```
      - Method PUT (Update)
        - ```curl -X PUT -b cookies.txt -H "Content-Type: application/json" -d '{"first_name":"John ooo"}' https://deploygroup50.azurewebsites.net/api/user/673f13ea8480fd3c43cc48e0```
      - DELETE curl (delete above command for demo test)
        - ```curl -X DELETE -b cookies.txt https://deploygroup50.azurewebsites.net/api/user/6743237867ef72e231daae62```
## Operation Guides for user
These are the links to different parts of guides:

- [First Time To Visit](#first-time-to-visit)
- [Borrow Book](#step-2:-start-borrowing-books)
- [Read Book](#step-3:-reading-borrowed-book)
- [Edit Profile](#edit-profile)
- [Delete Account](#delete-account)
- [Logout](#logout)

These operation guides only for admin:
- [List All User Profile](#list-all-user-profile)
- [List All Books](#list-all-books)
- [Add Books](#add-books)

### First Time To Visit
#### Step 1: Log in/Sign up

- **Option 1: Login to your account**
  1. Enter your email and password into email input field and password input field.
  2. Press the "Sign In" button <button type="submit" style="border: 3px solid aquamarine;background-color: white; color:black; border-radius:5px">Sign in</button>.

- **Option 2: Register as a new user**
  1. Press the "Sign up" button <button type="submit" style="border: 3px solid aquamarine;background-color: white; color:black; border-radius:5px">Sign up</button>.
  2. Fill in the personal information into the corresponding input field and select the gender.
    - `First Name` should be 3 or more character, *Required*
    - `Last Name` should be 2 or more character, *Required*
    - `Email` should with a suitable formate as `username@domainName.TLD`, *Required*
    - `Password` and `Confirm Password` should be the same, *Required*
    - `Gender` select the gender by pressing the radio button <input type="radio" name="Gander" value="Female" checked="false"> ,*Required*
  3. Once you enter all the information, press the "Submit" button
  4. User will be redirected back to the login page. Now, enter the email and password just sign up into email input field and password input field.
  5. Press the "Sign In" button <button type="submit" style="border: 3px solid aquamarine;background-color: white; color:black; border-radius:5px">Sign in</button>.

#### Step 2: Start Borrowing Books
User will enter the home page. On this page, there are four operations can perform:
- Profile: Check user information, can perform udate, delete of user information.
- Borrow: Allow user to borrow a book from book list.
- Books: Allow user to check and read the borrowed book.
- Logout: Allow user to logout.

But in this step we will focus on Borrowing books.
1. Press the "Borrow" button <button type="submit" style="border: 3px solid aquamarine;background-color: white; color:black; border-radius:5px">Borrow</button>.
2. Now, we are in the borrow page, it shows a list of books. Select the book you want to borrow by pressing the "Borrow" button <button type="submit" style="border: 3px solid aquamarine;background-color: white; color:black; border-radius:5px"> Borrow</button>.
3. Once pressed the "Borrow" button, borrow operation complete and will direct user back to home page.

#### Step 3: Reading Borrowed Book
1. Press the "Book" button <button type="submit" style="border: 3px solid aquamarine;background-color: white; color:black; border-radius:5px">Books</button> on the home page.
2. Select a book you want to read and press "Open" button <button type="submit" style="border: 3px solid aquamarine;background-color: white; color:black; border-radius:5px">Open</button>.
3. User can enjoy their readings.

### Edit Profile
1. Enter user profile page by pressing "Profile" button in home page.
2. In this page, user can edit their name, email and password by pressing the "Edit" button.
  - **Option 1: Change Name**
  1. Enter the change name page by pressing the "Edit button" beside the name and enter the change name page.
  2. Enter new `First Name` and `Last Name`.
  4. Press the "Save" button to confirm the change or "Cancel" button to leave.
  3. Change successful.
  - **Option 2: Change Email**
  1. Enter the change email page by pressing the "Edit button" beside the email and enter the change email page.
  2. Enter new `Email`.
  4. Press the "Save" button to confirm the change or "Cancel" button to leave.
  3. Change successful.
  - **Option 3: Change Password**
  1. Enter the change name page by pressing the "Edit button" beside the password and enter change password page.
  2. Enter the `Old Password`, `New Password`, and `Confirm Password`.
  3. Press the "Save" button to confirm the change or "Cancel" button to leave.
  4. Change successful.

### Delete Account
1. Enter the user profile page and press the "Delete Account" button.
2. Confirm delete by pressing "Delete Account" or pressing the "Cancel" button to leave.
3. Account deletion is successful and redirected to the login page.

### Logout
Press the "Logout" button on the home page.

### List All User Profile
Enter all user profile pages by pressing "All User Profile" button on the home page.
- Optional: Admin can search specific users by entering information in the Search bar and pressing enter.

### List All Books
Enter List All Books page by pressing "List All Books" button in home page.

### Add books
1. Press "Add books" button to enter the Add Book page.
2. Enter Author, Title, ISBN, and Publisher of the book into the corresponding input field.
3. Choose the file of the book from the directory by pressing "Choose File" button.
4. Press "Submit" to submit the change or press "Home" to cancel and go back to the home page.

## Appendix
Project Gutenberg: http://www.gutenberg.org
