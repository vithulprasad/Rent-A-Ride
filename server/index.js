const express = require("express");
const colors = require("colors");
const app = express();
require('dotenv').config();
const cors = require("cors");
const admin_route =require('./Router/Admin')
const user_route = require('./Router/User');
const partner_route = require('./Router/Partner');
const mongoose = require('mongoose')



mongoose.connect('mongodb://127.0.0.1:27017/Rent-A-Ride',{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>{
  console.log("database connected ");
})
.catch((error)=>{
  console.log(error);
})

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



app.use(
    cors({
      origin: "http://localhost:3000/",
      methods: ["GET", "POST"],
      credentials: true,
    })
  );
  app.options(
    "*",
    cors({
      allowedHeaders: ["Content-Type"],
    })
  );
  

  console.log("starting");
  app.use("/",user_route);
  app.use("/admin", admin_route);
  app.use('/partner', partner_route);
  
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON ${PORT} `.blue.bold);
  });
  