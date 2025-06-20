
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Signup = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(
                `http://localhost:3000/api/auth/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/");
            } else {
                alert(data.message || "Signup failed");
            }
        } catch (err) {
            alert("Something went wrong");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-sans flex items-center justify-center bg-background bg-neutral-950">
            <div className="w-full max-w-md p-8 space-y-10 bg-card rounded-xl shadow-sm  bg-black/75 shadow-green-300 text-white ">
                <h2 className="text-2xl text-center tracking-tighter font-semibold font-sans">Create your account</h2>
                <form onSubmit={handleSignup} className="space-y-4 flex flex-col gap-3 pt-16">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <Input
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
                        className="w-full bg-green-500 cursor-pointer hover:bg-green-300"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>

                    <Button
                        onClick={() => navigate("/login")}
                        size="sm"
                        className='cursor-pointer text-sm self-center'>
                        Already have an account ?<span className='font-medium underline text-green-700'>{" "} Login</span>
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Signup
