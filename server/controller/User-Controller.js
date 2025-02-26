const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const uploadToCloudinary = require("../utils/cloudinary");
const transporter = require("../utils/nodemailer");

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

    const mailOption = {
      from: '"Job Portal Support" <jatinhubhai6284@gmail.com>',
      to: email,
      subject: "Welcome to Job Portal",
      text: `Dear User,
    
    Thank you for registering with Job Portal. We are excited to have you on board.
    
    You have successfully signed up with the email: ${email}.
    
    If you did not register or need any assistance, please contact our support team.
    
    Best regards,  
    Job Portal Team`,
    };

    await transporter.sendMail(mailOption);

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

    //resume
    const { file = [], profilePhoto = [] } = req.files || {};

    //CONVERTING SKILLS TO ARRAY FORMAT FROM STRING FORMAT
    let skillsArray = [];
    // Handle skills properly based on type
    if (Array.isArray(skills)) {
      skillsArray = skills; // Already an array, use as is
    } else if (typeof skills === "string") {
      skillsArray = skills.split(",").map((skill) => skill.trim());
    }

    const userID = req.id; //FROM MIDDLEWARE AUTHENTICATION
    let user = await User.findById(userID); //FETCHING USER DATA FROM DATABASE
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

    //--HANDLING CLOUDINARY--
    // Handling resume upload
    if (file[0]) {
      const resumeUrl = await uploadToCloudinary(file[0], "uploads/resumes");
      if (resumeUrl) {
        user.profile.resume = resumeUrl;
        user.profile.resumeOriginalName = file[0].originalname;
      }
    }

    // Handling profile photo upload
    if (profilePhoto[0]) {
      const photoUrl = await uploadToCloudinary(
        profilePhoto[0],
        "uploads/profile_photos"
      );
      if (photoUrl) {
        user.profile.profilePhoto = photoUrl;
      }
    }

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

//HANDLING FORGET PASSWORD
const sendOTPForPass = async (req, res) => {
  try {
    const { email } = req.body;

    //NO EMAIL
    if (!email) {
      return res.status(400).json({
        MESSAGE: "Please provide registered email",
        SUCCESS: false,
      });
    }

    //USER EXISTS WITH PROVIDED EMAIL?
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        MESSAGE: "Account does not exist",

        SUCCESS: false,
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    //SENDING OTP
    const mailOptions = {
      from: "jatinhubhai6284@gmail.com", // Replace with your email
      to: user.email,
      subject: "Your OTP Code for Verification",
      html: `
        <p>Dear User,</p>
        <p>Your One-Time Password (OTP) for verification is:</p>
        <h2 style="color: #2d89ef; text-align: center;">${otp}</h2>
        <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,</p>
        <p><strong>Job Portal</strong></p>
      `,
    };
    //MAIL SENT
    await transporter.sendMail(mailOptions);
    user.otpForPass = otp;
    user.otpForPassExpiresIn = Date.now() + 10 * 60 * 1000; //10 MINUTES
    await user.save();

    return res.status(200).json({
      MESSAGE: "OTP sent to your email",
      userID: user._id,
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("ERROR WHILE RESETTING PASSWORD");
  }
};

//VALIDATING PASSWORD OTP
const validateOTPToChangePass = async (req, res) => {
  try {
    const { otp, userID } = req.body;

    if (!otp || !userID) {
      return res.status(400).json({
        MESSAGE: "Something is missing",
        SUCCESS: false,
      });
    }

    const user = await User.findById(userID);
    if (!user) {
      return res.status(400).json({
        MESSAGE: "User not found",
        SUCCESS: false,
      });
    }

    if (user.otpForPass === "" || user.otpForPass !== otp) {
      return res.status(400).json({
        MESSAGE: "Invalid OTP",
        SUCCESS: false,
      });
    }

    if (user.otpForPassExpiresIn < Date.now()) {
      return res.status(400).json({
        MESSAGE: "OTP Expired",
        SUCCESS: false,
      });
    }

    user.otpForPass = "";
    user.otpForPassExpiresIn = 0;
    await user.save();

    const token = jwt.sign({ optVerified: true }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("auth", token, { maxAge: 5 * 60 * 1000 }) //5 Minutes
      .json({
        MESSAGE: "OTP VERIFIED",
        SUCCESS: true,
      });
  } catch (error) {
    console.log(error);
    console.log("ERROR WHILE RESETTING PASSWORD");
  }
};

const ChangePassword = async (req, res) => {
  try {
    const auth = req.cookies.auth;

    //TOKEN EXISTS?
    if (!auth) {
      return res.status(401).json({
        MESSAGE: "Please do the OTP step",
        SUCCESS: false,
      });
    }

    try {
      const tokenDecode = jwt.verify(auth, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).json({
        MESSAGE: "Not Authorized",
        SUCCESS: false,
      });
    }

    const { userID, newPassword } = req.body;

    if (!userID || !newPassword) {
      return res.status(400).json({
        MESSAGE: "Something is missing",
        SUCCESS: false,
      });
    }
    const user = await User.findById(userID);

    if (!user) {
      return res.status(400).json({
        MESSAGE: "User not found",
        SUCCESS: false,
      });
    }

    //HASHING PASSWORD
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      MESSAGE: "Password Changed",
      SUCCESS: true,
    });
  } catch (error) {
    console.log(error);
    console.log("ERROR WHILE CHANGING PASSWORD");

    return res.status(500).json({
      MESSAGE: "Internal Server Error",
      SUCCESS: false,
      ERROR: error.message,
    });
  }
};

module.exports = {
  register,
  login,
  updateProfile,
  logout,
  sendOTPForPass,
  validateOTPToChangePass,
  ChangePassword,
};
