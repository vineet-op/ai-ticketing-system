import { inngest } from "../client"
import User from "../../models/User"
import { NonRetriableError } from "inngest"
import { SendEmail } from "../../utils/mailer"


export const onUserSignUp = inngest.createFunction(

    { id: "on-user-signup", retries: 2 },
    { event: "user/signup" },

    async ({ event, step }) => {

        try {
            const { email } = event.data
            const user = await step.run("get-user-email", async () => {
                const userObject = await User.findOne({ email })

                if (!userObject) {
                    throw new NonRetriableError("User not exist in DB")
                }
                return userObject
            })

            await step.run("send-welcome-email", async () => {
                const subject = `Welcome to the app`
                const message = `Hello 
                \n\n
                Thanks for onboarading we are glad to have you here with us
                `
                await SendEmail(user.email, subject, message)
            })

            return {
                success: true
            }

        } catch (error) {
            console.log("Error on on-sign-up", error.message)
            return {
                success: false
            }
        }
    }
)