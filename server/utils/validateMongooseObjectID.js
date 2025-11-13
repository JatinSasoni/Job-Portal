import mongoose from "mongoose";

const validateObjectID = (mongooseID) => {
  return mongoose.Types.ObjectId.isValid(mongooseID);
};
export default validateObjectID;
