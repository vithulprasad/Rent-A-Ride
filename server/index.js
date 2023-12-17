require('dotenv').config();
  const express = require("express");
  const colors = require("colors");
  const http = require('http')
  const app = express();
  const cors = require("cors");
  const admin_route =require('./Router/Admin')
  const user_route = require('./Router/User');
  const partner_route = require('./Router/Partner');
  const mongoose = require('mongoose')
  const { Server } = require("socket.io")

  mongoose.connect(process.env.MONGO,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  .then(()=>{
    console.log("database connected ");
  })
  .catch((error)=>{
    console.log(error);
  })



  app.use(cors({
    origin: process.env.CLIENT,
    methods: ["GET", "POST"],
  }));
  const port = process.env.PORT 
  
  const server= app.listen(port, () => {
    console.log(`SERVER RUNNING ON ${port} `.blue.bold);
  });

 
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT, 
      methods: ["GET", "POST"],
    }
  });
 

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());



 
    console.log("starting");
    app.use("/",user_route);
    app.use("/admin", admin_route);
    app.use('/partner', partner_route);




    
    
    io.on('connection', (socket) => {
         socket.on('sentMessage',async()=>{            
            io.emit('receiveMessage')
         })
    });
    

