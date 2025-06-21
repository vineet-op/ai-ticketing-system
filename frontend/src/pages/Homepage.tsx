
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot } from "lucide-react"
import { motion } from "motion/react"
import { useNavigate } from "react-router-dom"

const Homepage = () => {

    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-neutral-950  text-white relative overflow-hidden font-sans">
            {/* Background with mesh gradient */}

            <div className="relative z-10 container mx-auto px-4 py-20">
                <motion.div
                    className="max-w-6xl mx-auto text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        staggerChildren: 0.2,
                        delayChildren: 0.1,
                    }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="mb-8"
                    >
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2 text-sm font-medium">
                            <Bot className="w-4 h-4 mr-2" />
                            AI-Powered Ticketing
                        </Badge>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
                    >
                        <span className="bg-gradient-to-r font-sans from-white via-green-100 to-green-300 bg-clip-text text-transparent">
                            Ticketify
                        </span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-gray-200 tracking-tighter text-balance"
                    >
                        Revolutionize Your Support with <span className="text-green-400">AI Intelligence</span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="text-lg md:text-xl text-gray-300 mb-12 max-w-3xl mx-auto tracking-tighter text-balance"
                    >
                        Transform your customer support experience with our cutting-edge AI ticketing system.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            ease: "easeOut",
                        }}
                        className="flex flex-col sm:flex-row gap-4 justify-center mb-16 items-center"
                    >
                        <Button
                            onClick={() => navigate("/signup")}
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-black font-medium px-8 py-4 text-lg group transition-all duration-300 transform hover:scale-105 cursor-pointer w-80"
                        >
                            Signup
                        </Button>
                        <Button
                            onClick={() => navigate("/login")}
                            size="sm"
                            variant="outline"
                            className="border-green-500/50 text-green-400 hover:bg-green-500/10 font-medium px-8 py-4 text-lg transition-all duration-300 transform hover:scale-105 cursor-pointer w-80"
                        >
                            Login
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default Homepage