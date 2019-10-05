const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
    en_genre: String,
    ru_genre: String,
    en_author: String,
    ru_author: String,
    en_title: String,
    ru_title: String,
    en_price: String,
    ru_price: String
  },
  { timestamps: true }
);
var collectionName = 'books';
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Data", DataSchema, collectionName);