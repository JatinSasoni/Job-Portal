import { body } from "express-validator";
import mongoose from "mongoose";

export const validateUserRegistration = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[0-9]{10}$/)
    .withMessage("Phone number must be 10 digits"),

  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["student", "recruiter"])
    .withMessage("Invalid role specified"),
];
export const validateUserLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("role")
    .trim()
    .notEmpty()
    .withMessage("Role is required")
    .isIn(["student", "recruiter"])
    .withMessage("Invalid role specified"),
];
export const validateEmailForOTP = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];
export const validatePasswordReset = [
  body("userID")
    .notEmpty()
    .withMessage("userID is required")
    .custom((value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Invalid userID");
      }
      return true;
    }),

  body("newPassword")
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

export const validateMongooseID = (value) => {
  if (!mongoose.isValidObjectId(value)) {
    throw new Error("Invalid MongoDB ObjectId");
  }
  return true; // validation passed
};
