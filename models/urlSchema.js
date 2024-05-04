const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  urlTimestamp:[{timestamps:{type:Number}}]
},{
    timestamps:true
});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
