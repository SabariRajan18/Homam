import { Router } from "express";
import userRouters from "./usersRouter/index";
import adminRouters from "./adminRouter/intex"
const router = Router();

router.use("/", userRouters);
router.use("/v1/users", userRouters);
router.use("/v2/admin", adminRouters);



export default router;