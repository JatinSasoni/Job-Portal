import { v2 as cloudinary } from "cloudinary";
import getDataURI from "./dataURI.js";
import "dotenv/config";

//CLOUDINARY CONFIG
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload file to Cloudinary
const uploadToCloudinary = async (file, folder) => {
  try {
    if (!file) return null;
    const fileURI = getDataURI(file);
    const uploadResponse = await cloudinary.uploader.upload(fileURI.content, {
      folder: folder,
    });
    return uploadResponse.secure_url;
  } catch (error) {
    console.error(`Cloudinary Upload Error (${folder}):`, error);
    return null;
  }
};

export default uploadToCloudinary;
