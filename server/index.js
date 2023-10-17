  const express = require("express");
  const colors = require("colors");
  const app = express();
  require('dotenv').config();
  const cors = require("cors");
  const admin_route =require('./Router/Admin')
  const user_route = require('./Router/User');
  const partner_route = require('./Router/Partner');
  const user = require('../server/socket/user')
  const partner = require('../server/socket/partner')
  const mongoose = require('mongoose')
  const http = require('http');
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



  app.use(cors());
  const PORT = 4000;
  const server=app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON ${PORT} `.blue.bold);
  });

 
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Replace with your front-end URL
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


      socket.on('dataForward',async(data)=>{
        const  datas = await user.respond(data)
        socket.emit("data",datas)
      })
     
      
      socket.on('sent_message', async(data) => {
        const value =  await user.saveAndRespond(data)
        socket.emit('responseUser',value)
      });



      socket.on("findPartner",async(data)=>{
        console.log(data);
          const value = await partner.findPartner(data)
          socket.emit("findPartnerData",value)
      })

  
      socket.on('userOneTextFind',async(data)=>{
        const value = await partner.findUserChat(data)
        socket.emit('usersChat',value)
      })
    
    });