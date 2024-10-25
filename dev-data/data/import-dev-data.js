const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const Tour = require("./../../models/tourModel");
const User = require('../../models/userModel')
const Review = require('../../models/reviewModel')

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections)
    console.log("database connected successfully");
  });

//Read JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours.json`, "utf-8")
  
);

const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`,"utf-8"))
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`,"utf-8"))

//IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users)
    await Review.create(reviews)
    process.exit()
  } catch (error) {
    console.log(error);
  }
};

//Delete all data from collection/db
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany()
    await Review.deleteMany()
    process.exit()
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "--import") {
    // node dev-data/data/import-dev-data.js --import
  importData();
} else if (process.argv[2] === "--delete") {
    // node dev-data/data/import-dev-data.js --delete
  deleteData();
}
