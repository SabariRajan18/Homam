import GalleryModel from "../models/gallery.model";
import AdminModel from "../models/admin.model";
import UserContactsModel from "../models/form.model";
import fs from 'fs';
import path from 'path';
import jwt from "jsonwebtoken";
const JWT_SECRET: string = process.env.JWT_SECRET || "mySecretKey";
class AdminService {
    async loginService(request: any) {
        try {
            return { status: true, title: "login", pageName: "login" }
        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async adminLoginService(request: any, response: any) {
        try {

            const payloadStr = JSON.stringify(request.body, getCircularReplacer());
            const payload = JSON.parse(payloadStr);
            const { email, password } = payload;
            const adminData = await AdminModel.findOne({}).lean();
            console.log({ adminData }, email, password)
            if (email === adminData?.email && password === adminData?.password) {
                const adminToken = jwt.sign({ adminId: String(adminData?._id) }, JWT_SECRET, { expiresIn: "24h" });
                response.cookie("adminToken", adminToken, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000,
                    secure: false,
                    sameSite: "lax",
                });
                return { status: true, message: "Login successful", data: { adminToken } };
            } else {
                return { status: false, message: "Invalid email or password" };
            }
        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async dashboardService(request: any) {
        try {
            const AllImages = await GalleryModel.find({}).limit(20).sort({ _id: 1 }).lean();
            return { status: true, title: "dashboard", pageName: "dashboard", data: AllImages }
        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async userContactsService(request: any) {
        try {
            const UserContacts = await UserContactsModel.find({ status: "Active" }).lean();
            return { status: true, title: "user contacts", pageName: "usercontacts", data: UserContacts }
        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async adminUploads(request: any) {
        try {
            return { status: true, title: "Admin Uploads", pageName: "admin-uploads" }
        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async uploadImage(request: any) {
        try {
            const { filename } = request.file
            if (!filename) {
                return { status: false, message: "No file uploaded!" }
            };
            await GalleryModel.create({ image: filename });
            return { status: true, message: "file uploaded!" }

        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async deleteImage(imageId: string) {
        try {
            const image = await GalleryModel.findById(imageId);
            if (!image) {
                return { status: false, message: "Image not found!" };
            }
            const imagePath = path.join(__dirname, '../../uploads', image.image);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error deleting file:", err);
                } else {
                    console.log("File deleted:", imagePath);
                }
            });
            await GalleryModel.deleteOne({ _id: imageId });
            return { status: true, message: "Image deleted successfully!" };

        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
};

function getCircularReplacer() {
    const seen = new WeakSet();
    return (key: string, value: any) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) return;
            seen.add(value);
        }
        return value;
    };
}

export default new AdminService();