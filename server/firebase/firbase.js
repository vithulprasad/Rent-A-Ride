
const { initializeApp } =require("firebase/app");

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain:process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGERSENTER,
    appId:process.env.APPID
  };
  
  exports.app = initializeApp(firebaseConfig);

 