import "./Login.css"
import { CInput } from "../../common/CInput/CInput";
import { LoginUser } from "../../services/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { login } from "../../app/slices/userSlice";
import { useDispatch } from "react-redux";

export const Login = () => {
    const navigate = useNavigate();



    const dispatch = useDispatch(); //instancia de redux para escritura

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    const loginMe = async () => {
        const fetched = await LoginUser(user)

        if (fetched.token) {

            const decodificado = decodeToken(fetched.token)
            const passport = {
                token: fetched.token,
                user: decodificado,
            }
            dispatch(login({ credentials: passport }))

            setTimeout(() => {
                navigate("/")
            }, 2000);
        }

    }
    return (
        <div className="loginDesign">
            <CInput
                type="email"
                name="email"
                value={user.email || ""}
                changeEmit={inputHandler}
            />
            <CInput
                type="password"
                name="password"
                value={user.password || ""}
                changeEmit={inputHandler}
            />
            <button onClick={loginMe}>Login</button>
        </div>
    )
}