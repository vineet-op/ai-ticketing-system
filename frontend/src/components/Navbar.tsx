
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { LogOut, Ticket } from "lucide-react"


const Navbar = () => {

    const navigate = useNavigate()

    return (
        <nav className='w-full pt-8 font-sans flex bg-neutral-950 items-center text-center justify-between px-10 py-8'>
            <div className='text-lg font-normal flex gap-5 font-sans text-white text-center items-center justify-center'>
                <Ticket className='text-green-500 text-xl size-7' />
                <div className='text-xl'>
                    Ticketify
                </div>
            </div>
            <Button
                onClick={() => {
                    localStorage.removeItem('token');
                    navigate("/login")
                }}
                className='bg-green-500 text-white text-center font-normal cursor-pointer hover:text-black'>
                <LogOut /> Logout
            </Button>
        </nav>
    )
}

export default Navbar
