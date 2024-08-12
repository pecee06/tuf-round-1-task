import {Router} from "express"
import {signup,login,logout,loginState} from "../controllers/user.controller.js"
import isLoggedIn from "../auth.middleware.js"

const router = Router()

router.route("/signup").post(signup)
router.route("/current").get(loginState)
router.route("/login").post(login)
router.route("/logout").get(isLoggedIn,logout)

export default router