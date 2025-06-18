import 'dotenv/config';
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", userRoutes)


mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Mongoose is connected");
        app.listen(process.env.PORT, () => {
            console.log(`✅ Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log("❌ Errors while connecting to DB", err));

app.get("/", async (req, res) => {
    res.json({
        message: "Hello"
    });
});
