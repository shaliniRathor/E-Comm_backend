const mongoose = require("mongoose");

const customers_schema = new mongoose.Schema(
  {
    customer_Name: String,
    phone_No: String,
    email: String,
    address: String,
    zip_code: String,
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("customers", customers_schema);
