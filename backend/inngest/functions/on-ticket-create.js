import { inngest } from "../client.js"
import Ticket from "../../models/Ticket.js"
import User from "../../models/User.js"
import { NonRetriableError } from "inngest";
import analyzeTicket from "../../utils/ai.js";
import { SendEmail } from "../../utils/mailer.js";



export const onTicketCreated = inngest.createFunction(
    { id: "on-ticket-created", retries: 2 },
    { event: "ticket/created" },

    async ({ event, step }) => {
        try {
            const { ticketsId } = event.data

            //Get Ticket from the db
            const ticket = await step.run("fetch-ticket", async () => {
                const ticketObject = await Ticket.findById(ticketsId);

                if (!ticket) {
                    throw new NonRetriableError("Ticket not found")
                }
                return ticketObject

            })

            await step.run("update-ticket-status", async () => {
                await Ticket.findByIdAndUpdate(ticket._id, { status: "TODO" });
            });

            const aiResponse = await analyzeTicket(ticket);

            const relatedskills = await step.run("ai-processing", async () => {
                let skills = [];
                if (aiResponse) {
                    await Ticket.findByIdAndUpdate(ticket._id, {
                        priority: !["low", "medium", "high"].includes(aiResponse.priority)
                            ? "medium"
                            : aiResponse.priority,
                        helpfulNotes: aiResponse.helpfulNotes,
                        status: "IN_PROGRESS",
                        relatedSkills: aiResponse.relatedSkills,
                    });
                    skills = aiResponse.relatedSkills;
                }
                return skills;
            });

            const moderator = await step.run("assign-moderator", async () => {
                let user = await User.findOne({
                    role: "moderator",
                    skills: {
                        $elemMatch: {
                            $regex: relatedskills.join("|"),
                            $options: "i",
                        },
                    },
                });

                if (!user) {
                    user = await User.findOne({
                        role: "admin",
                    });
                }
                await Ticket.findByIdAndUpdate(ticket._id, {
                    assignedTo: user?._id || null,
                });
                return user;
            });


            await setp.run("send-email-notification", async () => {
                if (moderator) {
                    const finalTicket = await Ticket.findById(ticket._id);
                    await SendEmail(
                        moderator.email,
                        "Ticket Assigned",
                        `A new ticket is assigned to you ${finalTicket.title}`
                    );
                }
            });

            return { success: true };


        } catch (error) {
            console.error("❌ Error running the step", err.message);
            return { success: false };
        }
    }

)
