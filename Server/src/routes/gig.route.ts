import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { 
  createGig, 
  getAllGigs, 
  getGigById, 
  getMyGigs 
} from "../controllers/gig.controller.js";

const router = Router();

router.route("/").get(verifyJWT, getAllGigs).post(verifyJWT, createGig)
router.route("/my").get(verifyJWT, getMyGigs)
router.route("/:id").get(verifyJWT, getGigById)

export default router;