
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot } from "lucide-react"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"

const Homepage = () => {

    const navigate = useNavigate()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    return (
        <div className="min-h-screen bg-neutral-950  text-white relative overflow-hidden font-sans">
            {/* Background with mesh gradient */}
            <div className="absolute inset-0 bg-black/95" />
            <div className="absolute inset-0 opacity-30">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-green-400/10" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-green-500/20 via-transparent to-transparent" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-green-400/15 via-transparent to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-4 py-20">
                <motion.div
                    className="max-w-6xl mx-auto text-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 text-sm font-medium">
                            <Bot className="w-4 h-4 mr-2" />
                            AI-Powered Ticketing
                        </Badge>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r font-sans from-white via-green-100 to-green-300 bg-clip-text text-transparent">
                            Ticketify
                        </span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.h2
                        variants={itemVariants}
                        className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-gray-200"
                    >
                        Revolutionize Your Support with <span className="text-green-400">AI Intelligence</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed text-balance"
                    >
                        Transform your customer support experience with our cutting-edge AI ticketing system.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Button
                            onClick={() => navigate("/signup")}
                            size="lg"
                            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-4 text-lg group transition-all duration-300 transform hover:scale-105"
                        >
                            Signup
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            onClick={() => navigate("/login")}
                            size="lg"
                            variant="outline"
                            className="border-green-500/50 text-green-400 hover:bg-green-500/10 px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Login
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
        </div>
    )
}

export default Homepage