import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Login = () => {

    const navigate = useNavigate()

    const [loading, setLoading] = useState<boolean>(false)
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (e: any) => {

        try {
            e.preventDefault()
            setLoading(true)
            const response = await axios.post(`http://localhost:3000/api/auth/login`, form, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.data

            if (response.status === 200) {
                localStorage.setItem("token", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                navigate("/")
            }
            else {
                alert("Login Failed")
            }
        } catch (error) {
            alert("Something went wrong")
        }
        finally {
            setLoading(false)
        }


    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 font-sans">
            <div className="w-full max-w-md p-8 space-y-10 bg-card rounded-xl shadow-sm bg-black/75  shadow-green-300 text-white">
                <h2 className="text-2xl text-center tracking-tighter font-semibold font-sans">Login to Tickitify</h2>
                <form onSubmit={handleLogin} className="space-y-4 flex flex-col gap-3 pt-16">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <Input
                            className='font-sans'
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <Input
                            className='font-sans'
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full cursor-pointer bg-green-500 hover:bg-green-300"
                        disabled={loading}
                    >
                        {loading ? 'Logging...' : 'Login'}
                    </Button>


                    <Button
                        onClick={() => navigate("/signup")}
                        size="sm"
                        className='cursor-pointer text-sm'>
                        Don't have an account? <span className='font-medium underline text-green-700'>{" "} Signup</span>
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login
