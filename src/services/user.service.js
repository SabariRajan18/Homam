import GalleryModel from '../models/gallery.model.js';
import FormModel from '../models/form.model.js';
class UserServices {
    async homeService(request) {
        try {
            return { status: true, title: "Home", pageName: "home" }
        } catch (error) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async tariffService(request) {
        try {
            return { status: true, title: "tariff", pageName: "tariff" }
        } catch (error) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async aboutService(request) {
        try {
            return { status: true, title: "about", pageName: "about" }
        } catch (error) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async contactService(request) {
        try {
            return { status: true, title: "contact", pageName: "contact" }
        } catch (error) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async galleryService(request) {
        try {
            const allImages = await GalleryModel.find({}).lean();
            return { status: true, title: "gallery", pageName: "gallery", data: allImages }
        } catch (error) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
    async contactFormService(req_Body) {
        try {
            const payloadStr = JSON.stringify(req_Body, getCircularReplacer());
            const payload = JSON.parse(payloadStr);
            const createdData = await FormModel.create(payload)
            return { status: true, message: "Created Successfully", code: 201, data: createdData }
        } catch (error) {
            return { status: false, message: error.message ? error.message : "Internal Server Error!" }
        }
    };
};

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

export default new UserServices();