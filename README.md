# 🌍 WanderLust - Travel and Accommodation Platform

WanderLust is a full-stack web application inspired by Airbnb, designed to help travelers discover and book unique stays from around the world. It enables hosts to list their properties, and users to explore, review, and bookmark their favorite destinations — all in one place.

---

## 🚀 Features

### 🏠 For Users:
- Browse thousands of property listings with images, prices, and descriptions.
- Search listings by name, location, or category.
- View interactive maps with precise geolocations (powered by Google Maps API).
- Register, login, and manage user profiles.
- Add, edit, and delete reviews on listings.
- Bookmark or "favorite" properties to view later.

### 🧑‍💼 For Hosts:
- Add new listings with title, location, price, and images.
- Edit or delete existing listings.
- Upload photos using Cloudinary.
- Manage all hosted properties in one dashboard.

### ⚙️ Backend Features:
- RESTful API design.
- MongoDB Atlas for cloud data storage.
- Secure authentication with Passport.js.
- Session-based login system with connect-mongo.
- Fully dynamic EJS templating with clean Bootstrap styling.

---

## 🧩 Tech Stack

### 💻 Frontend
- **EJS** (Embedded JavaScript Templates)
- **Bootstrap 5**
- **JavaScript**
- **HTML5 / CSS3**

### 🛠 Backend
- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **Cloudinary** (for image uploads)
- **Mapbox / Google Maps API** (for geolocation and mapping)
- **connect-flash** (for alerts & messages)
- **Passport.js** (for authentication)

---

## 🗂 Folder Structure

WanderLust/
│
├── models/ # Mongoose schemas for Listings and Users
├── routes/ # Express routes for listings, users, and reviews
├── controllers/ # Route logic and controller functions
├── views/ # EJS templates for frontend
│ ├── listings/
│ ├── users/
│ ├── reviews/
│ └── partials/
├── public/ # Static assets (CSS, JS, images)
├── utils/ # Utility functions (e.g., wrapAsync, middleware)
├── app.js # Main Express server file
├── .env # Environment variables
└── package.json # Dependencies and scripts

yaml
Copy code

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the repository:
```bash
git clone https://github.com/Akshay1267/WanderLust.git
cd WanderLust
2️⃣ Install dependencies:
bash
Copy code
npm install
3️⃣ Configure environment variables:
Create a .env file in the root directory and add the following:

env
Copy code
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
MAP_API_KEY=your_google_or_mapbox_api_key
SESSION_SECRET=your_secret
MONGO_URL=your_mongodb_connection_string
4️⃣ Run the server:
bash
Copy code
npm start
5️⃣ Open in browser:
Visit 👉 http://localhost:5000

📸 Screenshots
🏕 Homepage
Displays popular destinations and search functionality.

🏡 Listing Details
Shows images, description, reviews, and location on map.

💬 Reviews Section
Users can post and delete reviews with live updates.

🧍 User Authentication
Sign up, login, and logout with session-based auth.

🔒 Authentication Flow
User signs up or logs in using email and password.

Passwords are securely hashed using bcrypt.

Sessions are stored in MongoDB using connect-mongo.

Flash messages show success/error feedback for every action.

☁️ Deployment
WanderLust can be deployed on:

Render / Railway / Vercel (Backend + Frontend)

MongoDB Atlas for the database

Cloudinary for media storage

🧑‍💻 Developer
👨 Akshay Jain
📍 MCA Student | MERN Stack Developer
💼 Passionate about web development and building full-stack projects
🔗 GitHub | LinkedIn

🌟 Acknowledgments
Shradha Khapra (Apna College) for the Alpha Course

Cloudinary

Mapbox

MongoDB Atlas

📝 License
This project is licensed under the MIT License – feel free to use and modify it.

⭐ If you like this project, don't forget to star the repo on GitHub!
yaml
Copy code

---

Would you like me to **add emojis and better formatting for GitHub visuals** (bold icons, code badges, table of contents, etc.) to make it more professional?
