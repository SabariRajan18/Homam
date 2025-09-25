import GalleryModel from "../models/gallery.model.js";
import AdminModel from "../models/admin.model.js";
import UserContactsModel from "../models/form.model.js";
import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import { uploadLargeImage } from "../config/cloudinary.js";
const JWT_SECRET = process.env.JWT_SECRET || "mySecretKey";
import sharp from "sharp";

class AdminService {
  async loginService(request) {
    try {
      return { status: true, title: "login", pageName: "login" };
    } catch (error) {
      return {
        status: false,
        message: error.message ? error.message : "Internal Server Error!",
      };
    }
  }
  async adminLoginService(request, response) {
    try {
      const payloadStr = JSON.stringify(request.body, getCircularReplacer());
      const payload = JSON.parse(payloadStr);
      const { email, password } = payload;
      const adminData = await AdminModel.findOne({}).lean();
      if (email === adminData?.email && password === adminData?.password) {
        const adminToken = jwt.sign(
          { adminId: String(adminData?._id) },
          JWT_SECRET,
          { expiresIn: "24h" }
        );
        response.cookie("adminToken", adminToken, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
          secure: false,
          sameSite: "lax",
        });
        return {
          status: true,
          message: "Login successful",
          data: { adminToken },
        };
      } else {
        return { status: false, message: "Invalid email or password" };
      }
    } catch (error) {
      return {
        status: false,
        message: error.message ? error.message : "Internal Server Error!",
      };
    }
  }
  async dashboardService(request) {
    try {
      const AllImages = await GalleryModel.find({})
        .limit(20)
        .sort({ _id: 1 })
        .lean();
      return {
        status: true,
        title: "dashboard",
        pageName: "dashboard",
        data: AllImages,
      };
    } catch (error) {
      return {
        status: false,
        message: error.message ? error.message : "Internal Server Error!",
      };
    }
  }
  async userContactsService(request) {
    try {
      const UserContacts = await UserContactsModel.find({
        status: "Active",
      }).lean();
      return {
        status: true,
        title: "user contacts",
        pageName: "usercontacts",
        data: UserContacts,
      };
    } catch (error) {
      return {
        status: false,
        message: error.message ? error.message : "Internal Server Error!",
      };
    }
  }
  async adminUploads(request) {
    try {
      return {
        status: true,
        title: "Admin Uploads",
        pageName: "admin-uploads",
      };
    } catch (error) {
      return {
        status: false,
        message: error.message ? error.message : "Internal Server Error!",
      };
    }
  }
  async uploadImage(request) {
    try {
      const file = request.file;

      if (!file) return { status: false, message: "No file uploaded!" };

      const filename = `${Date.now()}-${file.originalname.split(".")[0]}`;

      let quality = 90;
      let compressedBuffer;

      while (true) {
        compressedBuffer = await sharp(file.buffer)
          .jpeg({ quality, mozjpeg: true }) // For JPEG
          .toBuffer();

        console.log(
          `Trying quality ${quality}, size = ${(
            compressedBuffer.length /
            1024 /
            1024
          ).toFixed(2)} MB`
        );

        if (compressedBuffer.length <= 10 * 1024 * 1024 || quality <= 30) break;

        quality -= 10; // step down if still >10MB
      }
      const imageUrl = await uploadLargeImage(compressedBuffer, filename);
      console.log({ imageUrl });

      await GalleryModel.create({ image: imageUrl });
      return { status: true, message: "file uploaded!" };
    } catch (error) {
      return {
        status: false,
        message: error.message ? error.message : "Internal Server Error!",
      };
    }
  }
  async deleteImage(imageId) {
    try {
      const image = await GalleryModel.findById(imageId);
      if (!image) {
        return { status: false, message: "Image not found!" };
      }
      
      await GalleryModel.deleteOne({ _id: imageId });
      return { status: true, message: "Image deleted successfully!" };
    } catch (error) {
      return {
        status: false,
        message: error.message ? error.message : "Internal Server Error!",
      };
    }
  }
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
}

export default new AdminService();
