const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//HANDLING USER REGISTER
const register = async (req, res) => {
  try {
    const { username, email, password, phoneNumber, role } = req.body;

    //CHECKING IF ALL FIELDS ARE THERE
    if (!username || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        MESSAGE: "Something is missing",
        SUCCESS: false,
      });
    }
    //IF EMAIL ALREADY EXISTS?
    const alreadyExists = await User.findOne({ email: email });
    if (alreadyExists) {
      return res.status(400).json({
        MESSAGE: "Email already exists",
        SUCCESS: false,
      });
    }

    //HASHING PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    //REGISTERING USER
    const user = await User.create({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      role: role,
    });

    return res.status(201).json({
      MESSAGE: "User Registered Successfully",
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("ERROR WHILE REGISTERING USER ");
  }
};

//HANDLING USER LOGIN
const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    //CHECKING IF ALL FIELDS ARE THERE
    if (!email || !password || !role) {
      return res.status(400).json({
        MESSAGE: "Something is missing",
        SUCCESS: false,
      });
    }

    //GETTING USER THROUGH EMAIL
    let user = await User.findOne({
      email,
    });

    //USER EXISTS? || REGISTERED EMAIL?
    if (!user) {
      return res.status(400).json({
        MESSAGE: "Invalid Email or Password",
        SUCCESS: false,
      });
    }

    //CHECKING ROLE SPECIFIED BY USER IS MATCHING WITH ROLE IN DB
    if (role !== user.role) {
      return res.status(400).json({
        MESSAGE: "Account does not exist with specified role",
        SUCCESS: false,
      });
    }

    //VALIDATING PASSWORD
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        MESSAGE: "Invalid Email or Password",
        SUCCESS: false,
      });
    }

    //GENERATING TOKEN
    const tokenPayload = {
      userID: user._id,
    };

    const token = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    //UPDATED USER OBJ TO BE SENT ON FRONTEND (PASSWORD SHOULD NOT BE SENT IN RESPONSE)
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: "",
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
      profile: user.profile,
    };

    return (
      res
        .status(200)
        .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000 })
        //ADD ADDITIONAL COOKIE DATA LATER
        .json({
          MESSAGE: `Welcome back ${user.username}`,
          user,
          SUCCESS: true,
        })
    );
  } catch (error) {
    console.log(error);
    console.log("ERROR WHILE LOGIN USER ");
  }
};

//HANDLING USER LOGOUT
const logout = async (req, res) => {
  try {
    return res.status(200).clearCookie("token").json({
      MESSAGE: "Logout successfully",
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("ERROR WHILE LOGOUT");
  }
};

//HANDLING USER PROFILE UPDATE
const updateProfile = async (req, res) => {
  try {
    const { username, email, phoneNumber, bio, skills } = req.body;

    //CONVERTING SKILLS TO ARRAY FORMAT FROM STRING FORMAT
    let skillsArray = [];

    if (skills && typeof skills === "string") {
      skillsArray = skills.split(",").map((skill) => skill.trim()); // Ensures no extra spaces
    }

    const userID = req.id; //FROM MIDDLEWARE AUTHENTICATION
    let user = await User.findById(userID);
    if (!user) {
      return res.status(400).json({
        MESSAGE: "USER NOT FOUND",
        SUCCESS: false,
      });
    }

    //UPDATING DATA
    if (username) user.username = username;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    await user.save();

    //UPDATED USER OBJ TO BE SENT ON FRONTEND (PASSWORD SHOULD NOT BE SENT IN RESPONSE)
    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: "",
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      MESSAGE: "Profile updated successfully",
      user,
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("ERROR WHILE UPDATING PROFILE");
  }
};

module.exports = {
  register,
  login,
  updateProfile,
  logout,
};
