import { Router } from "express";
import userRouters from "./usersRouter/index";
const router = Router();

router.use("/v1/users", userRouters);
router.use("/", userRouters);


export default router;