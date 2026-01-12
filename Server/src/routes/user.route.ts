import { Router } from "express";

const userRoute = Router()

// ROUTE IMPORTS
import { changePassword, getAllUserNames, getCurrentUser, login, logout, register, updateDetails } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

userRoute.route('/register').post(register)
userRoute.route('/login').post(login)
userRoute.route('/update-details').post(verifyJWT, updateDetails)
userRoute.route('/change-password').post(verifyJWT, changePassword)
userRoute.route('/logout').get(verifyJWT, logout)
userRoute.route('/get-all-users-name').get(verifyJWT, getAllUserNames)
userRoute.route('/current-user').get(getCurrentUser)

export default userRoute