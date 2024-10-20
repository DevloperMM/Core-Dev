import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    //upload file on cloud
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //file uploaded successfully, unlink it
    fs.unlinkSync(localFilePath);
    return response;
  } catch (err) {
    fs.unlinkSync(localFilePath);
    //removes locally saved temp files as the upload operation got failed
    return null;
  }
};

const destroyFromCloudinary = async (publicImgPath) => {
  return cloudinary.uploader.destroy(publicImgPath);
};

export { uploadOnCloudinary, destroyFromCloudinary };
