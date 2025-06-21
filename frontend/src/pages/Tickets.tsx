import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface TicketsProps {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
}

const Tickets = () => {
    const [form, setForm] = useState({ title: "", description: "" });
    const [tickets, setTickets] = useState<TicketsProps[]>([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const fetchTickets = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/tickets`, {
                headers: { Authorization: `Bearer ${token}` },
                method: "GET",
            });
            const data = await res.json();
            setTickets(data.tickets || []);
        } catch (err) {
            console.error("Failed to fetch tickets:", err);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:3000/api/tickets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const data = await res.json();
            console.log("data:", data);

            if (res.ok) {
                setForm({ title: "", description: "" });
                await fetchTickets(); // Refresh list
            } else {
                alert(data.message || "Ticket creation failed");
            }
        } catch (err) {
            alert("Error creating ticket");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-full bg-neutral-950 text-white p-8 font-sans">
            <div className="container mx-auto max-w-4xl">
                <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">Create New Ticket</h2>

                <form
                    onSubmit={handleSubmit}
                    className="bg-black/50 border border-green-500/30 rounded-xl p-8 mb-12 space-y-6 shadow-lg shadow-green-500/20"
                >
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Ticket Title"
                        className="w-full p-3 bg-neutral-800 border border-green-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Describe your issue in detail"
                        className="w-full p-3 bg-neutral-800 border border-green-500/30 rounded-md text-white placeholder-gray-400 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                    ></textarea>
                    <button
                        className="w-full bg-green-500 text-black font-medium py-3 rounded-md hover:bg-green-400 transition-colors duration-300 flex items-center justify-center cursor-pointer"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit Ticket"}
                    </button>
                </form>

                <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">Your Tickets</h2>

                <div className="space-y-8 pb-10">
                    {tickets.length === 0 ? (
                        <div className="text-center text-gray-500 bg-black/50 p-8 rounded-xl border border-green-500/30">
                            No tickets submitted yet. Create your first ticket!
                        </div>
                    ) : (
                        tickets.map((ticket) => (
                            <Link
                                key={ticket._id}
                                to={`/tickets/${ticket._id}`}
                                className="block bg-black/50 border border-green-500/30 rounded-xl p-6 hover:bg-green-500/10 transition-colors duration-300 group"
                            >
                                <h3 className="text-xl font-bold text-green-400 mb-2 group-hover:text-green-300">
                                    {ticket.title}
                                </h3>
                                <p className="text-gray-300 mb-2">{ticket.description}</p>
                                <p className="text-sm text-green-500">
                                    Created: {new Date(ticket.createdAt).toLocaleString()}
                                </p>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tickets