const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const partner = require("../models/Partner");
const bikes = require("../models/BikeModel");
const booking = require("../models/booking");
const users = require("../models/Users")
exports.login = async (req, res) => {
  try {
    console.log(req.body.data);
    const { email, password } = req.body.data;
    const PartnerValid = await partner.findOne({ email: email });
    if (PartnerValid) {
      if (PartnerValid.requestStatus === true) {
        if (PartnerValid.blocking === false) {
          const passwordMatch = await bcrypt.compare(
            password,
            PartnerValid.password
          );
          if (passwordMatch) {
            if (PartnerValid.role === "partner") {
              //-----json wevToken creation------
              const token = jwt.sign(
                { id: PartnerValid._id, role: "partner" },
                process.env.TOKENSECRET,
                {
                  expiresIn: "30d",
                }
              );
              const obj = {
                token,
                name: PartnerValid.name,
                roll: "partner",
              };
              res
                .status(200)
                .json({
                  obj,
                  success: true,
                  name: PartnerValid.name,
                  blocking: false,
                });
            } else {
              res.status(200).json({ success: false });
            }
          } else {
            res.status(200).json({ success: false });
          }
        } else {
          res.status(200).json({ success: true, blocking: true });
        }
      } else {
        console.log("this is request sattus");
        res.status(200).json({ success: false });
      }
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.navProfileDetails = async (req, res) => {
  try {
    let findPartner = await partner.findOne({ _id:req.id });
    res.status(200).json({ success: true, data: findPartner });
  } catch (error) {
    console.log(error.message);
  }
};

exports.AddBike = async (req, res) => {
  try {
    console.log(req.id, "entering--------------");
    const token = req.body.data.partner;
    const verifyToken = jwt.verify(token, process.env.TOKENSECRET);
    const partnerId = verifyToken.id;
    const partnerDetails = await partner.findOne({ _id: partnerId });

    if (partnerId) {
      const {
        bikeName,
        bikeBrand,
        rentPerHour,
        bikeCategory,
        bikeCC,
        plateNumber,
      } = req.body.data.data;
      const location = req.body.data.locations;
      if (
        bikeName == null ||
        bikeBrand == null ||
        bikeCategory == null ||
        plateNumber == null ||
        rentPerHour == null ||
        bikeCC == null ||
        req.body.data.image == null ||
        req.body.data.locations == null
      ) {
        res.status(200).json({ success: false });
      } else {
        const addBike = new bikes({
          name: bikeName,
          BrandName: bikeBrand,
          rentPerHour: rentPerHour,
          NormalCategory: bikeCategory,
          cc: bikeCC,
          PlateNumber: plateNumber,
          partnerId: partnerId,
          date: Date.now(),
          image: req.body.data.image,
          companyName: partnerDetails.company,
          locations: location,
          district:partnerDetails.address.district
        });
        await addBike
          .save()
          .then(() => {
            res.status(200).json({ success: true });
          })
          .catch((err) => {
            res.status(200).json({ success: false });
          });
      }
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
};

exports.listBike = async (req, res) => {
  try {
    console.log('entering to bike details.............');
    const partnerId = req.id
    console.log(partnerId);
    if (partnerId) {
      const bike = await bikes.find({ partnerId: partnerId });
      console.log(bike);
      res.status(200).json({ success: true, bikes: bike });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
};

exports.PartnerDetails = async (req, res) => {
  try {
    console.log('entering to partner details--------------');
    const partnerToken = req.query.token;
    const details = jwt.verify(partnerToken, process.env.TOKENSECRET);
    const partnerId = details.id;

    if (partnerId) {
      const partners = await partner.findOne({ _id: partnerId });
      res.status(200).json({ success: true, partner: partners });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message,'-------error message from partner side------profile-------');
    res.status(200).json({ success: false });
  }
};

exports.partnerEdit = async (req, res) => {
    console.log("entering to the partner edit..............");
  try {
    const information = req.body.information;
    const image = req.body.image;
    const token = req.body.token;

    const verify = jwt.verify(token, process.env.TOKENSECRET);
    const partnerId = verify.id;

    const address = {
      district: information.district,
      state: information.state,
      localArea: information.area,
      age: information.age,
      post: information.post,
      pin: information.pin,
    };
    if (partnerId) {
      await partner
        .findOneAndUpdate(
          { _id: partnerId },
          {
            $set: {
              image: image,
              name: information.name,
              phone: information.phone,
              company: information.companyName,
              address: address,
            },
          },
          { new: true } // To return the updated document
        )
        .then(() => {
          res.status(200).json({ success: true });
        })
        .catch((err) => {
          res.status(200).json({ success: false });
        });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message,'-------error message from partner side------profile edit-------');
    res.status(200).json({ success: false });
  }
};
exports.locationDetails = async (req, res) => {
  try {
    console.log("entering to location details...............");
    const token = req.query.token;
    const findPartner = jwt.verify(token, process.env.TOKENSECRET);
    const partnerId = findPartner.id;
    if (partnerId) {
      const partnerDetails = await partner.findOne({ _id: partnerId });
      const location = partnerDetails.locationPoints;
      res.status(200).json({ success: true, location: location });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
};

exports.bikeDelete = async (req, res) => {
    console.log("entering to Bike delete...............");
  try {
    const id = req.query.id;
    await bikes
      .findOneAndDelete({ _id: id })
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch(() => {
        res.status(200).json({ success: false });
      });

    console.log(id);
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
};
exports.editBike = async (req, res) => {
  try {
    console.log(req.body.data ,'entering to bike edit');
    const { name, brand, Rent, category, id, cc, PlateNumber } = req.body.data;

    await bikes
      .findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name: name,
            BrandName: brand,
            rentPerHour: Rent,
            NormalCategory: category,
            cc: cc,
            PlateNumber: PlateNumber,
            requestStatus: "requestingAgain",
          },
        }
      )
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(200).json({ success: false });
      });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
}

exports.partnerBookings=async(req,res)=>{
  try {
    const partnerId = req.id;
    const data = await booking.find({partner:partnerId})
    .populate("userId")
    .populate("bike")
    console.log(data,'partner details ',);
    res.status(200).json({ success: true ,data:data});
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
}
exports.unlist=async(req,res)=>{
  try {
    const id = req.query.id
    const check = await bikes.findOne({_id:id})
      if(check.isBooked==true){
        res.status(200).json({ success: true ,message:"the bike was booked"});
      }else{
        const findBike = await bikes.findOneAndUpdate({_id:id},{$set:{Listed:true,available:false}})
        res.status(200).json({ success: true ,message:"success"});
      }
    
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
}
exports.list=async(req,res)=>{
  try {
    const id = req.query.id
    const check = await bikes.findOne({_id:id})
      if(check.isBooked==true){
        res.status(200).json({ success: true });
      }else{
        const findBike = await bikes.findOneAndUpdate({_id:id},{$set:{Listed:false,available:true}})
        res.status(200).json({ success: true});
      }
    
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
}

exports.completeBooking = async (req, res) => {
  try {
    const id = req.query.id;
    const bookingNow = await booking.findOne({ _id: id });
    const bikeId = booking.bike;

    const booking1 = await booking.findOneAndUpdate({ _id: id }, { $set: { bikeStatus: "complete" } });
    const bikes1 = await bikes.findOneAndUpdate({ _id: bikeId }, { $set: { isBooked: false } });
    const users1 = await users.findOneAndUpdate({ _id: bookingNow.userId }, { $inc: { wallet: bookingNow.totalAmount } });
    const users2 = await users.findOneAndUpdate({ _id: bookingNow.userId }, { $push: { walletHistory: id} });
    await users.findOneAndUpdate({ _id: bookingNow.userId }, { $push: { walletDate: Date.now()} });

    // Create an array of promises and pass it to Promise.all
    const promises = [booking1, bikes1, users1, users2];

    Promise.all(promises)
      .then(() => {
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        console.log(err.message, 'error from booking complete');
        res.status(200).json({ success: false });
      });
  } catch (error) {
    console.log(error.message, 'error from booking complete');
    res.status(200).json({ success: false });
  }
}
