const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure 
const DataSchema = new Schema(
  {
		cart: Array,
		token: String,
		needUpdate: Boolean
  },
  { timestamps: true }
);
var collectionName = 'carts';
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("Carts", DataSchema, collectionName);