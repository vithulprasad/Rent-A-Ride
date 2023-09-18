// var cloudinary = require("cloudinary").v2;

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARYNAME,
//   api_key: process.env.APIKEYCLUDINARY,
//   api_secret: process.env.APISECRUTCLOUDINARY
// });

// const opts = {
//   overwrite: true,
//   invalidate: true,
//   resource_type: "auto"
// };

// module.exports = (images) => {
//   return new Promise((resolve, reject) => {
//     const uploadPromises = [];

//     // Iterate through the array of image paths and upload each one
//     images.forEach((image) => {
//       uploadPromises.push(
//         new Promise((innerResolve, innerReject) => {
//           cloudinary.uploader.upload(image, opts, (error, result) => {
//             if (result && result.secure_url) {
//               console.log(result.secure_url);
//               innerResolve(result.secure_url);
//             } else {
//               console.log(error && error.message);
//               innerReject({ error: error && error.message });
//             }
//           });
//         })
//       );
//     });

//     // Wait for all uploads to complete and then resolve with an array of URLs
//     Promise.all(uploadPromises)
//       .then((secureUrls) => {
//         resolve(secureUrls);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });
// };
const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name:process.env.CLOUDINARYNAME, 
    api_key:process.env.APIKEYCLUDINARY, 
    api_secret:process.env.APISECRUTCLOUDINARY
  });
module.exports=cloudinary