const otpGenerate = require("otp-generator");
const nodemailer = require("nodemailer");
const users = require("../models/Users");
const company = require("../models/Partner");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const partner = require("../models/Partner");
const BikeModel = require("../models/BikeModel");

//---------------------------comparing otp and verify the email---------------------------//
exports.otp = async (req, res) => {
  try {
    const otpOriginal = parseInt(req.app.locals.OTP);
    const otpFromBody = parseInt(req.body.otp.join(""));
    const { firstName, lastName, phone, email, password } = req.body.data;
    const passwordHash = await bcrypt.hash(password, 10);
    if (otpFromBody === otpOriginal) {
      const user = new users({
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        password: passwordHash,
        role: "client",
      });
      await user
        .save()
        .then(async () => {
          const find_is_partner = await partner.findOne({ email: email });
          if (find_is_partner) {
            await users.findOneAndUpdate(
              { email: email },
              { $set: { isPartner: true } }
            );
            await partner.findOneAndUpdate(
              { email: email },
              { $set: { isClient: true } }
            );
          }
          res.status(200).json({ success: true });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).json({ success: false });
        });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
  }
};

//---------------------------Generating otp and sent to the client side---------------------------//
exports.otpGenerate = async (req, res) => {
  try {
    let email = req.query.data;
    const find_email = await users.findOne({ email: email });
    if (find_email == null) {
      if (req.app.locals.resetSession === true) {
        let OTP = await otpGenerate.generate(6, {
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        req.app.locals.OTP = OTP;
        console.log("resent otp is ", OTP);
      } else {
        let OTP = await otpGenerate.generate(6, {
          lowerCaseAlphabets: false,
          upperCaseAlphabets: false,
          specialChars: false,
        });
        req.app.locals.OTP = OTP;
        req.app.locals.resetSession = true;
        console.log("first otp -  ", OTP);
      }

      // sending to the client's email address
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: req.query.data,
        subject: "OTP for registering Rent a ride",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold;'>" +
          req.app.locals.OTP +
          "</h1>", // html body
      };

      transporter.sendMail(mailOptions, (error, info) => {
        console.log("entering into the last stage of otp");
        if (error) {
          console.error(error);
        } else {
          console.log("Email sent: " + info.response);
          console.log("sending response");
          res.status(200).json({ success: true });
        }
      });
    } else {
      console.log(
        "entering in to the email was found and it sent to the clint"
      );
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json();
  }
};
//   -------------------------------------------login form validation code ----------------------------------//
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body.data;
    const find_user_email = await users.findOne({ email: email });
    if (find_user_email) {
      if (find_user_email.blocking === false) {
        const passwordMatch = await bcrypt.compare(
          password,
          find_user_email.password
        );
        if (passwordMatch) {
          if (find_user_email.role === "client") {
            //-----json webToken creation------
            const token = jwt.sign(
              { id: find_user_email._id, role: "client" },
              process.env.TOKENSECRET,
              {
                expiresIn: "30d",
              }
            );
            const obj = {
              token,
              name: find_user_email.firstName + " " + find_user_email.lastName,
              id: find_user_email._id,
              roll: "client",
            };
            res
              .status(200)
              .json({
                obj,
                success: true,
                name:
                  find_user_email.firstName + " " + find_user_email.lastName,
              });
          } else {
            console.log("roll error");
            res.status(403).json({ success: false });
          }
        } else {
          console.log("password error");
          res.status(200).json({ success: false });
        }
      } else {
        console.log("block error");
        res.status(403).json({ success: false });
      }
    } else {
      console.log("email error");
      res.status(200).json({ success: false });
    }
  } catch (error) {
    res.status(500).json();
  }
};
exports.companyRegistration = async (req, res) => {
  try {
    const {
      email,
      password,
      confirm,
      name,
      State,
      phone,
      district,
      local_area,
      post,
      pin,
      Age,
      gender,
      CompanyName,
      
    } = req.body.data;
    const selectedLocations = req.body.data.selectedLocations
    const valid_for_applying = await company.findOne({ email: email });
    if (!valid_for_applying) {
      const Address = {
        district: district,
        state: State,
        localArea: local_area,
        age: Age,
        post: post,
        pin: pin,
      };
      const Partner = new partner({
        name: name,
        gender: gender,
        phone: phone,
        email: email,
        password: password,
        role: "partner",
        address: Address,
        company: CompanyName,
        locationPoints:selectedLocations
      });
      await Partner.save()
        .then(async () => {
          const check_is_client = await users.findOne({ email: email });
          if (check_is_client) {
            await company.findOneAndUpdate(
              { email: email },
              { $set: { isClient: true } }
            );
          }
          res.status(200).json({ success: true, email: email, name: name });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).json({ success: false });
        });
    } else {
      res.status(200).json({ success: false, name: name });
    }
  } catch (error) {
    console.log(error.message);
  }
};
exports.navDetails = async (req, res) => {
  try {
    const token = req.query.token;
    const verifyToken = jwt.verify(token, process.env.TOKENSECRET);
    const userId = verifyToken.id;
    if (userId) {
      const findUser = await users.findOne({ _id: userId });
      const user = findUser.isPartner;
      if (user === true) {
        res.status(200).json({ success: true, userData: true });
      } else {
        console.log("data was not found");
        res.status(200).json({ success: true, userData: false });
      }
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
};
exports.googleAuthentication = async (req, res) => {
  try {
    const user = req.body.data;
    const findUser = await users.findOne({ email: user });
    if (findUser) {
      const token = jwt.sign(
        { id: findUser._id, role: "client" },
        process.env.TOKENSECRET,
        {
          expiresIn: "30d",
        }
      );
      const obj = {
        token,
        name: findUser.firstName + " " + findUser.lastName,
        id: findUser._id,
        roll: "client",
      };
      res
        .status(200)
        .json({
          obj,
          success: true,
          name: findUser.firstName + " " + findUser.lastName,
        });
    } else {
      res.status(200).json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
};

exports.getBikeInformation = async (req, res) => {
  try {
    const bikes = await BikeModel.find();
    res.status(200).json({ success: true, bikes: bikes });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
};

exports.profileEditDataDetails = async (req, res) => {
  try {
    let token = req.query.token;
    let tokenDatas = jwt.verify(token, process.env.TOKENSECRET);
    const userId = tokenDatas.id;
    const user = await users.findOne({ _id: userId });
    console.log(user, "this is the user id");
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ message: false });
  }
};

exports.editProfileData = async (req, res) => {
  try {
    console.log("emtering to the updataion");
    console.log(req.body.form, "this is the form value");
    console.log(req.body.user, "this is the user");
    const usersValues = req.body.user;
    const token = req.body.form;

    const firstName = usersValues.formValues.firstName;
    const lastName = usersValues.formValues.lastName;
    const phone = usersValues.formValues.phone;
    const district = usersValues.formValues.district;
    const state = usersValues.formValues.state;
    const localarea = usersValues.formValues.street;
    const post = usersValues.formValues.post;
    const pin = usersValues.formValues.pin;
    const image1 = usersValues.image1;
    const image2 = usersValues.image2;
    const image3 = usersValues.image3;
    const image4 = usersValues.image4;
    const image5 = usersValues.image5;

    const jwtToken = jwt.verify(token, process.env.TOKENSECRET);
    const userId = jwtToken.id;
    console.log(userId, "this si the is");

    const user = await users.findOne({ _id: userId });
    if (user) {
      console.log("entering to the updatation ");
      await users
        .findOneAndUpdate(
          { _id: userId },
          {
            $set: {
              firstName: firstName,
              lastName: lastName,
              phone: phone,
              Profile: image1,
              "address.district": district,
              "address.state": state,
              "address.localArea": localarea,
              "address.pin": pin,
              "address.post": post,
              "license.front": image2,
              "license.back": image3,
              "userInfo.front": image4,
              "userInfo.back": image5,
            },
          }
        )
        .then((response) => {
          res.json({ success: true, data: response });
        })
        .catch((error) => {
          res.json({ success: false });
        });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ success: false });
  }
};
