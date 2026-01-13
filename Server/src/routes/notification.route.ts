import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUserNotifications, markAsRead } from "../controllers/notification.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(getUserNotifications);
router.route("/:id/read").patch(markAsRead);

export default router;