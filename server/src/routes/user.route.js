import {Router} from "express"
import {registerUser,loginUser, getUser, editUser} from "../controllers/user.controller.js"
import { verifyUser } from "../middlewares/userVerification.js"
const router=Router()



router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/userdetail").get(verifyUser,getUser)
router.route("/edituserdetail").put(verifyUser,editUser)

export default router