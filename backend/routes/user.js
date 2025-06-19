import express from "express"
import { getUsers, userLogin, userLogout, userSignup, userUpdate } from "../controller/user.js"

import { authMiddleware } from "../middleware/auth.js"

const router = express.Router()

router.post("/update-user", authMiddleware, userUpdate)

router.get("/getusers", authMiddleware, getUsers)

router.post("/signup", userSignup)
router.post("/login", userLogin)
router.post("/logout", userLogout)


export default router