const mongoose = require("mongoose");

const admin_schema  = new mongoose.Schema(
  {
    
    name:String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("admins", admin_schema);
