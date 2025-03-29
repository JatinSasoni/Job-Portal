const mongoose = require("mongoose");

const validateObjectID = (mongooseID) => {
  return mongoose.Types.ObjectId.isValid(mongooseID);
};
module.exports = validateObjectID;
