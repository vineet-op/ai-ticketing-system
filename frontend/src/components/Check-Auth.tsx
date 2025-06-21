import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Check_Auth = ({ children, protect }: any) => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {

        const token = localStorage.getItem("token");

        if (protect) {
            if (!token) {
                navigate("/login")
            }
            else {
                setLoading(false)
            }
        }
        else {
            if (token) {
                navigate("/");
                setLoading(false)
            }
            else {
                setLoading(false)
            }
        }
    }, [navigate, protect])

    if (loading) {
        return <div>
            Loading....
        </div>
    }

    return children

}

export default Check_Auth
