const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbUrl = process.env.ATLASDB_URL;
const Listing = require('../models/listing.js');
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
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner: "690ee6ded6db7a9049954bf2"  
    }));
    await Listing.insertMany(initData.data);
    console.log("Database Initialized");
};

initDB();