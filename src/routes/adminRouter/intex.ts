import { Router } from "express";
import { adminController } from "../../controllers/index";
import upload from "../../middlewares/upload";
import { adminAuth } from "../../middlewares/adminAuth";
const router = Router();


router.get("/login", adminController.login);
router.post("/login", adminController.adminLogin);

router.get("/dashboard",  adminController.dashboard);
router.get("/users-contacts-details",  adminController.userContactsDetails);
router.get("/admin-uploads",  adminController.adminUploads);
router.post("/upload-image",  upload.single("image"), adminController.uploadImage);
router.post("/delete-image/:imageId",  adminController.deleteImage);


export default router;