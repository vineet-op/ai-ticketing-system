import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { inngest } from "../inngest/client.js"
import User from "../models/User.js"

//OK
export const userSignup = async (req, res) => {

    const { email, password, skills = [] } = req.body



    try {
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ email, password: hashPassword, skills })

        //inngest
        await inngest.send({
            name: "user/signup",
            data: {
                email
            }
        })
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);

        res.status(200).json({
            user, token
        })

    } catch (error) {
        res.status(500).json({
            message: "Signup Failed", details: error.message
        })
    }
}

//OK
export const userLogin = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new Error("Missing credentials")
    }

    try {

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(500).json({
                message: "No user in DB"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                error: "Invalid crendentials"
            })
        }

        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);

        res.status(200).json({
            user, token
        })


    } catch (error) {
        res.status(500).json({
            message: "Signup Failed", details: error.message
        })
    }
}


export const userLogout = async (req, res) => {
    try {
        const token = await req.headers.authorization.split("")[1]
        if (!token) {
            return res.status(401).json({
                error: "Unauthorized"
            })
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    error: "Unauthorized"
                })
            }
        })

        res.json({ message: "Logout successfully" })

    } catch (error) {
        res.status(500).json({
            message: "Logout Failed", details: error.message
        })
    }
}

export const userUpdate = async (req, res) => {

    const { email, role, skills = [] } = req.body
    try {
        if (req.user?.role != "admin") {
            return res.status(403).json({
                error: "Access forbidden"
            })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: "User not found"
            })
        }

        await User.updateOne(
            { email },
            { skills: skills ? skills : user.skills, role }
        )

        return res.json({ message: "User Updated Successfully" })

    } catch (error) {
        res.status(500).json({
            message: "UserUpdated Failed", details: error.message
        })
    }
}


//OK
export const getUsers = async (req, res) => {
    try {

        if (req.user?.role != "admin") {
            return res.status(403).json({
                error: "Access forbidden"
            })
        }

        const users = await User.find({}).select("-password")

        res.json({
            users: users
        })

    } catch (error) {
        res.status(500).json({
            message: "Failed to getUsers", details: error.message
        })
    }
}