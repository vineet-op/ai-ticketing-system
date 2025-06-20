import 'dotenv/config';
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoutes from "./routes/user.js"
import ticketRoutes from "./routes/ticket.js"
import { serve } from "inngest/express"
import { inngest } from './inngest/client.js';
import { onUserSignUp } from "./inngest/functions/on-signup.js"
import { onTicketCreated } from "./inngest/functions/on-ticket-create.js"


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", userRoutes)
app.use("/api/tickets", ticketRoutes)

app.use("/api/inngest", serve({
    client: inngest,
    functions: [onUserSignUp, onTicketCreated]
}))

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Mongoose is connected");
        app.listen(process.env.PORT, () => {
            console.log(`✅ Server is running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.log("❌ Errors while connecting to DB", err));

