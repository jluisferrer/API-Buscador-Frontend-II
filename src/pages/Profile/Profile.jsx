import "./Profile.css"
import { useSelector } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { useNavigate } from "react-router"
import { useEffect } from "react"

export const Profile = () => {

    const navigate = useNavigate()

    const rdxUser = useSelector(userData)

    useEffect(() => {
        if (!rdxUser?.credentials?.token) {
            navigate("/")
        }
    }, [rdxUser])
    return (
        <>
            soy el perfil
        </>
    )
}