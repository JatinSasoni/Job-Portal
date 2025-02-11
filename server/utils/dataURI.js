const path = require("path");
const DataUriParser = require("datauri/parser.js");

// The file is stored in memory (since we are using memoryStorage() instead of diskStorage in multer ) .
//memoryStorage() is temporary storage
// file.buffer contains the raw binary data of the file.

const getDataURI = (file) => {
  const parser = new DataUriParser(); //parser constructor

  //path.extname("image.png") returns .png.
  // This ensures the correct MIME type is assigned.
  const extensionName = path.extname(file.originalname).toString();

  // This line converts an uploaded file into a Base64 Data URI using the datauri/parser package.
  return parser.format(extensionName, file.buffer);
  //   The .format() method converts the binary buffer into a Base64 Data URI.
  //Cloudinary accepts this Base64 format, so we can upload it without saving the file to disk.
};

module.exports = getDataURI;
