
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
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-4">
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
                        className="w-full"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                </form>
                <div className="text-center text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Button
                        variant="link"
                        size="sm"
                        onClick={() => navigate('/login')}
                    >
                        Log in
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Signup
