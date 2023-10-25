  const express = require("express");
  const colors = require("colors");
  const app = express();
  require('dotenv').config();
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
  const PORT = 4000;
  const server=app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON ${PORT} `.blue.bold);
  });

 
  const io = new Server(server, {
    cors: {
      origin: "https://rent-a-ride-ten.vercel.app", // Replace with your front-end URL
      methods: ["GET", "POST"],
    }
  });
 
  


  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());



  // app.use(
  //     cors({
  //       origin: "http://localhost:3000/",
  //       methods: ["GET", "POST"],
  //       credentials: true,
  //     })
  //   );
  //   app.options(
  //     "*",
  //     cors({
  //       allowedHeaders: ["Content-Type"],
  //     })
  //   );

    // app.use(cors(corsOpts));


    console.log("starting");
    app.use("/",user_route);
    app.use("/admin", admin_route);
    app.use('/partner', partner_route);

    // communication connections



    
    
    io.on('connection', (socket) => {
         socket.on('sentMessage',async()=>{            
            io.emit('receiveMessage')
         })
    });
    