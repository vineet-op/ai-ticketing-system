import { inngest } from "../inngest/client.js"
import Ticket from "../models/Ticket.js"

export const createTicket = async (req, res) => {

    try {
        const { title, description } = req.body

        if (!title || !description) {
            res.status(401).json({
                message: "Missing credentials"
            })
        }

        const newTicket = await Ticket.create({
            title,
            description,
            createdBy: req.user._id.toString()
        })

        await inngest.send({
            name: "ticket/created",
            data: {
                ticketId: (await newTicket)._id.toString(),
                title,
                description,
                createdBy: req.user._id.toString()
            }
        })

        return res.status(200).json({
            message: "Ticket Created and started processing",
            ticket: newTicket
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to Create Ticket", details: error.message
        })
    }

}

export const getTickets = async (req, res) => {
    try {
        const user = req.user
        let tickets = []

        if (user.role != "user") {
            tickets = Ticket.find({})
                .populate("assignedTo", ["email", "_id"])
                .sort({ createdAt: -1 })
        }
        else {
            const tickets = await Ticket.find({ createdBy: user._id })
                .select("title description status createdAt")
                .sort({ createdAt: -1 })
        }

        return res.json(200).json({ tickets })

    } catch (error) {
        res.status(500).json({
            message: "Failed to Get Tickets", details: error.message
        })
    }
}

export const getTicket = async (req, res) => {
    try {

        const user = req.user

        let ticket

        if (user.role !== "user") {
            ticket = Ticket.findById(req.params.id)
                .populate("assignedTo", ["email", "_id"])
        }
        else {
            ticket = Ticket.findOne({
                createdBy: req.user._id,
                _id: req.params._id
            })
                .select("title description status createdAt")
        }

        if (!ticket) {
            return res.status(401).json({
                message: "Ticket not found"
            })
        }

        return res.status(200).json({ ticket })

    } catch (error) {
        res.status(500).json({
            message: "Failed to Get a Ticket", details: error.message
        })
    }
}