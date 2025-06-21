import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

interface TicketProps {
    title: string;
    description: string;
    status: string;
    priority: string;
    relatedSkills: string[];
    helpfulNotes: string;
    assignedTo: string | { email: string } | null;
    createdBy?: string | { email: string };
    deadline?: string;
    createdAt: string;
}

const Ticket = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState<TicketProps | null>(null);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const res = await fetch(
                    `http://localhost:3000/api/tickets/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await res.json();

                if (res.ok) {
                    setTicket(data.ticket);

                } else {
                    alert(data.message || "Failed to fetch ticket");
                }
            } catch (err) {
                console.error(err);
                alert("Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id]);

    if (loading)
        return <div className="text-center mt-10 text-white">Loading ticket details...</div>;
    if (!ticket) return <div className="text-center mt-10 text-white">Ticket not found</div>;

    return (
        <div className="h-full max-h-full bg-neutral-950 text-white  font-sans">
            <div className="max-w-3xl mx-auto px-10">
                <h2 className="text-3xl font-bold text-green-400 mb-8 text-center">Ticket Details</h2>

                <div className="bg-black/50 border border-green-500/30 rounded-xl p-8 space-y-6 shadow-lg shadow-green-500/20">
                    <h3 className="text-2xl font-bold text-green-400 mb-4">{ticket.title}</h3>
                    <p className="text-gray-300 mb-4">{ticket.description}</p>

                    {/* Conditionally render extended details */}
                    {ticket.status && (
                        <>
                            <div className="border-b border-green-500/30 my-4"></div>
                            <div className="space-y-4">
                                <p>
                                    <strong className="text-green-500">Status:</strong> {ticket.status}
                                </p>
                                {ticket.priority && (
                                    <p>
                                        <strong className="text-green-500">Priority:</strong> {ticket.priority}
                                    </p>
                                )}

                                {ticket.relatedSkills?.length > 0 && (
                                    <p>
                                        <strong className="text-green-500">Related Skills:</strong>{" "}
                                        {ticket.relatedSkills.join(", ")}
                                    </p>
                                )}

                                {ticket.helpfulNotes && (
                                    <div>
                                        <strong className="text-green-500 block mb-2">Helpful Notes:</strong>
                                        <div className="prose max-w-none rounded mt-2 text-gray-300">
                                            <ReactMarkdown>{ticket.helpfulNotes}</ReactMarkdown>
                                        </div>
                                    </div>
                                )}

                                {ticket.assignedTo && typeof ticket.assignedTo === 'object' && 'email' in ticket.assignedTo && (
                                    <p>
                                        <strong className="text-green-500">Assigned To:</strong> {ticket.assignedTo.email}
                                    </p>
                                )}

                                {ticket.createdAt && (
                                    <p className="text-sm text-green-500 mt-2">
                                        Created At: {new Date(ticket.createdAt).toLocaleString()}
                                    </p>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Ticket