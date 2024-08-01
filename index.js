const express= require('express')
const app= express()
const mongoose= require('mongoose')
require('dotenv').config()
const morgan= require('morgan')
const cors= require('cors')

//import dashboard routes=>//
const banners_routes= require('./routes/dash_routes/banners_routes')
const category_routes=require('./routes/dash_routes/category_routes.js')
const order_routes= require('./routes/dash_routes/order_routes')
const products_routes= require('./routes/dash_routes/products_routes')
const customers_routes= require('./routes/dash_routes/customers_routes')
const admin_routes= require('./routes/dash_routes/admin_routes')

//import web routes=>>//

const web_products_routes= require('./routes/web_routes/product_routes.js')
const web_category_routes= require('./routes/web_routes/category_routes.js')
const web_banners_routes= require('./routes/web_routes/banner_routes.js')
const web_customer_routes= require('./routes/web_routes/customers_routes.js')

app.use(cors())
app.use(morgan("dev"))
app.use(express.json());


//all dashboard routes=>//
app.use('/api',banners_routes)
app.use('/api',category_routes)
app.use('/api',order_routes)
app.use('/api',products_routes)
app.use('/api',customers_routes)
app.use('/api',admin_routes)
app.use('/api',web_banners_routes)

//all website routes=>//

app.use('/api',web_products_routes)
app.use('/api',web_category_routes)
app.use('/api',web_customer_routes)

app.get('/',(req,res)=>{
    res.send({message:"api is working"})
})


app.get('*',(req,res)=>{
    res.send({message:"no route found"})
})

app.listen(process.env.PORT || 4000,()=>{
    console.log("Server is Listen on ",process.env.PORT)

    //database connection//
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("Mongodb connected !!")
    })
    .catch((err)=>{
        console.log(err,"Not connected to Mongodb !!")})

})