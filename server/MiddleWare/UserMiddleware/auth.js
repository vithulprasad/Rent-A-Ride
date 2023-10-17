const jwt = require("jsonwebtoken");
const userModel = require("../../models/Users");

const localVariables = async (req, res, next) => {
  req.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};

const userAuth = async (req, res, next) => {
  try {
    const tokenWithBearer = req.headers["authorization"];
    if (!tokenWithBearer || !tokenWithBearer.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({
          message: "Authorization header missing or invalid",
          success: false,
        });
    }
    const token = tokenWithBearer.split(" ")[1];
    jwt.verify(token, process.env.TOKENSECRET, (err, encoded) => {
      if (err) {
        return res.status(401).json({ message: "Auth failed", success: false });
      } else if (encoded.role === "client") {
        req.id = encoded.id;
        next();
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const IsBlock = async (req, res, next) => {
  try {
    const user = req.id;
    const findUser = await userModel.findOne({ _id: user });
    if (findUser.blocking === false) {
      next();
    } else {
      res.status(200).json({ message: "user is blocked", success: false });
    }
  } catch (error) {
    res.status(200).json({ message: "Internal Server Error", success: false });
  }
};

module.exports = {
  localVariables,
  userAuth,
  IsBlock,
};
