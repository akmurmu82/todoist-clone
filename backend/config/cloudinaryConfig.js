import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'my_cloud_name',
    api_key: process.env.CLOUDINARY_API_KEY || 'my_api_key',
    api_secret: process.env.CLOUDINARY
});