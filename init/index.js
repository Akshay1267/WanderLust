const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbUrl = process.env.ATLASDB_URL;
const Listing = require('../models/listing.js');
const User = require('../models/user.js');
const initData = require('./data.js');

main().then((res) => {
    console.log("Connected to MongoDb");
}).catch((err) => {
    console.log("Error: ", err);
});

async function main() {
    await mongoose.connect(dbUrl, {
        ssl: true,
        retryWrites: true,
        w: "majority"
    });
}

const initDB = async () => {
    // Delete existing listings and users
    await Listing.deleteMany({});
    await User.deleteMany({});
    
    // Create a default user
    const defaultUser = new User({
        username: "wanderlust_admin",
        email: "admin@wanderlust.com"
    });
    
    const registeredUser = await User.register(defaultUser, "password123");
    console.log("Default user created:", registeredUser.username);
    
    // Add listings with the created user as owner
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner: registeredUser._id  
    }));
    await Listing.insertMany(initData.data);
    console.log("Database Initialized with", initData.data.length, "listings");
};

initDB().then(() => {
    mongoose.connection.close();
    console.log("Database initialization complete");
}).catch((err) => {
    console.log("Init error:", err);
    mongoose.connection.close();
});