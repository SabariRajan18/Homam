import { Response, Request } from "express";
import UserServices from "../../services/user.service"
import { errorResponse, renderResponse, successResponse } from "../../helpers/response.helper";
class UserController {
    async index(req: Request, res: Response) {
        try {
            const result = await UserServices.homeService(req);
            return renderResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
    async home(req: Request, res: Response) {
        try {
            const result = await UserServices.homeService(req);
            return renderResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
    async tariff(req: Request, res: Response) {
        try {
            const result = await UserServices.tariffService(req);
            return renderResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
    async about(req: Request, res: Response) {
        try {
            const result = await UserServices.aboutService(req);
            return renderResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
    async contact(req: Request, res: Response) {
        try {
            const result = await UserServices.contactService(req);
            return renderResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
    async gallery(req: Request, res: Response) {
        try {
            const result = await UserServices.galleryService(req);
            return renderResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
    async contactForm(req: Request, res: Response) {
        try {
            const result = await UserServices.contactFormService(req.body);
            return successResponse(req, res, result)
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
};
export default new UserController();