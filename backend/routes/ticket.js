import express from "express"

import { createTicket, getTickets, getTicket } from "../controller/ticket.js"

import { authMiddleware } from "../middleware/auth.js"


const router = express.Router()

router.post("/", authMiddleware, createTicket)

router.get("/", authMiddleware, getTickets)

router.get("/:id", authMiddleware, getTicket)



export default router