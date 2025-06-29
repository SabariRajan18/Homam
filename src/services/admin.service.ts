import GalleryModel from "../models/gallery.model";
import AdminModel from "../models/admin.model";
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

            const { email, password } = request.body;

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
            const AllImages = await GalleryModel.find({}).lean();
            return { status: true, title: "dashboard", pageName: "dashboard", data: AllImages }
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

            await GalleryModel.deleteOne({ _id: imageId });
            return { status: true, message: "Image deleted successfully!" };

        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
};

export default new AdminService();