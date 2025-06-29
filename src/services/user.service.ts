import FormModel from '../models/form.model';
import GalleryModel from '../models/gallery.model';
class UserServices {
    async homeService(request: any) {
        try {
            return { status: true, title: "Home", pageName: "home" }
        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async tariffService(request: any) {
        try {
            return { status: true, title: "tariff", pageName: "tariff" }
        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async aboutService(request: any) {
        try {
            return { status: true, title: "about", pageName: "about" }
        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async contactService(request: any) {
        try {
            return { status: true, title: "contact", pageName: "contact" }
        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async galleryService(request: any) {
        try {
            const allImages = await GalleryModel.find({}).lean();
            return { status: true, title: "gallery", pageName: "gallery", data: allImages }
        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async testimonialsService(request: any) {
        try {
            return { status: true, title: "testimonials", pageName: "testimonials" }
        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async contactFormService(req_Body: any) {
        try {
            const createdData = await FormModel.create(req_Body)
            return { status: true, message: "Created Successfully", code: 201, data: createdData }
        } catch (error: any) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
};

export default new UserServices();