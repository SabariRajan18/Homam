import { Router } from "express";
import userController from "../../controllers";
const router = Router();


router.get("/", userController.index);
router.get("/home", userController.home);
router.get("/tariff", userController.tariff);
router.get("/about", userController.about);
router.get("/contact", userController.contact);
router.get("/gallery", userController.gallery);
router.get("/testimonials", userController.testimonials);

router.post("/create", userController.create);


export default router;