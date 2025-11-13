import jwt from "jsonwebtoken";

const isAuthentication = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    //TOKEN EXISTS?
    if (!token) {
      return res.status(401).json({
        MESSAGE: "Please Login first",
        SUCCESS: false,
      });
    }

    //DECODING TOKEN
    const tokenDecode = jwt.verify(token, process.env.SECRET_KEY);
    if (!tokenDecode) {
      return res.status(401).json({
        MESSAGE: "Please Login first",
        SUCCESS: false,
      });
    }

    req.id = tokenDecode.userID;
    req.role = tokenDecode.role;

    next();
  } catch (error) {
    console.log("ERROR IN AUTHENTICATION MIDDLEWARE:", error);
    return res.status(500).json({
      MESSAGE: "Internal Server Error",
      SUCCESS: false,
    });
  }
};

export default isAuthentication;
