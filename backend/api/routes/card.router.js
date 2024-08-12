import {Router} from "express"
import {addCard,updateCard,deleteCard} from "../controllers/card.controller.js"
import isLoggedIn from "../auth.middleware.js"

const router = Router()

router.route("/create").post(isLoggedIn,addCard)
router.route("/update").patch(isLoggedIn,updateCard)
router.route("/delete").delete(isLoggedIn,deleteCard)

export default router