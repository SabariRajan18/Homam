import { Router } from "express";
import { adminController } from "../../controllers/index";
import upload from "../../middlewares/upload";
import { adminAuth } from "../../middlewares/adminAuth";
const router = Router();


router.get("/login", adminController.login);
router.post("/login", adminController.adminLogin);

router.get("/dashboard", adminAuth, adminController.dashboard);
router.get("/admin-uploads", adminAuth, adminController.adminUploads);
router.post("/upload-image", adminAuth, upload.single("image"), adminController.uploadImage);
router.post("/delete-image/:imageId", adminAuth, adminController.deleteImage);


export default router;