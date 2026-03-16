import AdminService from "../../services/admin.service.js";
import {
  errorResponse,
  renderResponse,
  successResponse,
} from "../../helpers/response.helper.js";

class AdminController {
  async login(req, res) {
    try {
      const result = await AdminService.loginService(req);
      return renderResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, {
        status: false,
        message: "Internal Server Error",
        code: 500,
      });
    }
  }
  async adminLogin(req, res) {
    try {
      const result = await AdminService.adminLoginService(req, res);
      res.cookie("adminToken", result.data.adminToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, {
        status: false,
        message: "Internal Server Error",
        code: 500,
      });
    }
  }
  async dashboard(req, res) {
    try {
      const result = await AdminService.dashboardService(req);
      return renderResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, {
        status: false,
        message: "Internal Server Error",
        code: 500,
      });
    }
  }
  async userContactsDetails(req, res) {
    try {
      const result = await AdminService.userContactsService(req);
      return renderResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, {
        status: false,
        message: "Internal Server Error",
        code: 500,
      });
    }
  }
  async adminUploads(req, res) {
    try {
      const result = await AdminService.adminUploads(req);
      return renderResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, {
        status: false,
        message: "Internal Server Error",
        code: 500,
      });
    }
  }
  async uploadImage(req, res) {
    try {
      const result = await AdminService.uploadImage(req);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, {
        status: false,
        message: "Internal Server Error",
        code: 500,
      });
    }
  }
  async deleteImage(req, res) {
    try {
      const result = await AdminService.deleteImage(req.params.imageId);
      return successResponse(req, res, result);
    } catch (error) {
      return errorResponse(req, res, {
        status: false,
        message: "Internal Server Error",
        code: 500,
      });
    }
  }
}
export default new AdminController();
