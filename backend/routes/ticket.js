import express from "express"

import { createTicket, getTickets, getTicket } from "../controller/ticket.js"

import { authMiddleware } from "../middleware/auth.js"


const router = express.Router()

router.get("/", authMiddleware, getTickets)

router.get("/:id", authMiddleware, getTicket)

router.get("/", authMiddleware, createTicket)

export default router