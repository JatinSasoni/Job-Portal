import { body } from "express-validator";
import mongoose from "mongoose";

export const validateJobCreation = [
  body("title").trim().notEmpty().withMessage("Title is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("requirements")
    .trim()
    .notEmpty()
    .withMessage("Requirements are required"),
  body("salary")
    .notEmpty()
    .withMessage("Salary is required")
    .isNumeric()
    .withMessage("Salary must be a number"),

  body("location").trim().notEmpty().withMessage("Location is required"),

  body("jobType").trim().notEmpty().withMessage("Job type is required"),

  body("position").trim().notEmpty().withMessage("Position is required"),

  body("experienceLevel")
    .trim()
    .notEmpty()
    .withMessage("Experience level is required"),

  body("CompanyID")
    .notEmpty()
    .withMessage("CompanyID is required")
    .custom((value) => {
      if (!mongoose.isValidObjectId(value)) {
        throw new Error("Invalid CompanyID");
      }
      return true;
    }),
];
