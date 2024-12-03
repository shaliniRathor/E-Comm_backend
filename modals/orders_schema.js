const mongoose = require("mongoose");

const order_schema = new mongoose.Schema(
  {
    order_id: String,
    order_total: Number,
    order_status: String,
    payment_mode: String,

    customer_details: {
      customer_Name: String,
      phone_No: String,
      email: String,
      address: String,
      zip_code: String,
      city:String,
    },
    products: [
      {
        product_name: String,
        price: Number,
        category: String,
        quantity: String,
        description: String,
        qty:String,
        image: [
          {
            image_url: String,
            image_name: String,
            path: String,
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("orders", order_schema);
