const mongoose = require("mongoose");
const initData = require("./data.js");
const DocumentService = require("../models/service.js");

const config = require("dotenv").config();


async function main() {
    await mongoose.connect("mongodb+srv://sagar:sagar123@cluster0.kncywn0.mongodb.net/servises_db");
    await initDB();
    console.log("Data initialization completed.");
    mongoose.disconnect();
}

async function initDB() {
    await DocumentService.deleteMany({});
    await DocumentService.insertMany(initData);
    console.log("Data was initialized");
}

main().catch(console.error);
