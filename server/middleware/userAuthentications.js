const jwt = require("jsonwebtoken");

const isAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    //TOKEN EXISTS?
    if (!token) {
      return res.status(401).json({
        MESSAGE: "User not authorized",
        SUCCESS: false,
      });
    }

    //DECODING TOKEN
    const tokenDecode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!tokenDecode) {
      return res.status(401).json({
        MESSAGE: "Invalid token",
        SUCCESS: false,
      });
    }

    req.id = tokenDecode.userID;
    next();
  } catch (error) {
    console.log(error);
    console.log("ERROR IN AUTHENTICATION MIDDLEWARE");
  }
};

module.exports = isAuthentication;
