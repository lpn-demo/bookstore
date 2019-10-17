const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    name: String,
    surname: String,
    password: String,
    email: String,
    token: String,
    role: String
  },
  { timestamps: true }
);
var collectionName = 'users'
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("User", DataSchema, collectionName);