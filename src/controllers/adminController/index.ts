import { Response, Request } from "express";
import AdminService from "../../services/admin.service"
import { errorResponse, renderResponse, successResponse } from "../../helpers/response.helper";

class AdminController {
    async login(req: Request, res: Response) {
        try {
            const result = await AdminService.loginService(req);
            return renderResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
    async adminLogin(req: Request, res: Response) {
        try {
            const result = await AdminService.adminLoginService(req, res);
            return successResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
    async dashboard(req: Request, res: Response) {
        try {
            const result = await AdminService.dashboardService(req);
            return renderResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
     async userContactsDetails(req: Request, res: Response) {
        try {
            const result = await AdminService.userContactsService(req);
            return renderResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
    async adminUploads(req: Request, res: Response) {
        try {
            const result = await AdminService.adminUploads(req);
            return renderResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
    async uploadImage(req: Request, res: Response) {
        try {
            const result = await AdminService.uploadImage(req);
            return successResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
    async deleteImage(req: Request, res: Response) {
        try {
            const result = await AdminService.deleteImage(req.params.imageId);
            return successResponse(req, res, result);
        } catch (error) {
            return errorResponse(req, res, { status: false, message: "Internal Server Error", code: 500 });
        };
    };
};
export default new AdminController();