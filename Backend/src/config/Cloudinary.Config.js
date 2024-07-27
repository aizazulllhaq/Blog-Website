import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import {
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_CLOUD_NAME,
} from "../constant";

cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
    try {
        const response = cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });
        console.log(`File is uploaded on cloudinary : ${response.url}`);

        // delete from locally
        fs.unlinkSync(localFilePath);

        return response;
    } catch (error) {
        // delete file from local
        fs.unlinkSync(localFilePath);
    }
};
