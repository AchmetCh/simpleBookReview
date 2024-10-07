# Simple Book Review
### Simple Book Review is a full-stack MERN (MongoDB, Express, React, Node.js) application where users can register, log in, create, view, edit, and delete book reviews. Each user can manage their own reviews, while also viewing reviews posted by others.

#### Features
* User Authentication: Users can sign up and log in to their accounts using JWT authentication.
* Create Book Reviews: Registered users can add reviews for books by providing a title, author, review text, and rating.
* View All Reviews: All users, registered or not, can view the list of all book reviews.
* Edit Reviews: Users can only edit the reviews they have created.
* Delete Reviews: Users can delete their own reviews if they wish.
Responsive Design: Fully responsive design using Bootstrap to ensure a smooth user experience on all devices.

### Tech Stack
* Frontend: React.js, Bootstrap
* Backend: Node.js, Express.js
* Database: MongoDB (with Mongoose)
* Authentication: JWT (JSON Web Tokens)
* API Requests: Axios
* Styling: React Bootstrap, custom CSS

## Installation
### Prerequisites
* Node.js and npm installed on your local machine
* MongoDB installed locally or a MongoDB Atlas cloud account
* API tool like Postman for testing API endpoints (optional)

### Steps
1. Clone the repository:
``` bash 
git clone https://github.com/AchmetCh/simpleBookReview.git
cd simple-book-review 
```
2. Install dependencies for both the server and client:
``` bash
# For backend
cd backend
npm install

# For client
cd ../client
npm install
```
3. Set up your MongoDB connection. In the server folder, create a .env file and add the following environment variables:
``` bash
MONGO_URL = you database url
PRIVATE_KEY = private_key
SALT_ROUNDS = salt_rounds
```
4. Start the development servers:
* Backend (in /server folder):
``` bash
nodemon start
```
* Frontend (in /client folder):
``` bash
npm start
```
Contributions
Feel free to fork this project, raise issues, or submit PRs if you find ways to improve it.

License
This project is licensed under the MIT License.


