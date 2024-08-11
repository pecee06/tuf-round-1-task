import {Router} from "express"
import {addCard,updateCard,deleteCard} from "./controller.js"

const router = Router()

router.route("/add").post(addCard)
router.route("/update").patch(updateCard)
router.route("/delete").delete(deleteCard)

export default router