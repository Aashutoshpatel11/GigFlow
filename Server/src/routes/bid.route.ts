import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { submitBid, getBidsForGig, hireFreelancer } from "../controllers/bid.controller.js";

const router = Router();

router.route("/").post(verifyJWT, submitBid);

router.route("/:gigId").get(verifyJWT, getBidsForGig);

router.route("/:bidId/hire").patch(verifyJWT, hireFreelancer);

export default router;