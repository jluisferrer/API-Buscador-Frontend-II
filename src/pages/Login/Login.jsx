import "./Login.css"
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { LoginUser } from "../../services/apiCalls";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { validame } from "../../utils/functions";

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

    const [userError, setUserError] = useState({
        emailError: "",
        passwordError: ""
    })

    const [msg, setMsg] = useState("");
    const [msgError, setMsgError] = useState("")

    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }))
    }

    const loginMe = async () => {
        const fetched = await LoginUser(user)
        try { if (fetched.token) {

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
            
        } catch (error) {
            setMsgError(error.message);
        }
       
    }
    return (
        <div className="loginDesign">
            <CInput
             className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
            }`}
                type="email"
                placeholder="Write your email"
                name="email"
                value={user.email || ""}
                changeEmit={inputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
             <div className="inputDesignError">{userError.emailError}</div>
            <CInput
            className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
        }`}
                type="password"
                placeholder="Write your password"
                name="password"
                value={user.password || ""}
                changeEmit={inputHandler}
                onBlurFunction={(e) => checkError(e)}
            />
            <div className="inputDesignError">{userError.passwordError}</div>
            <CButton
                    className={"cButtonDesign"}
                    title={"Login"}
                    functionEmit={loginMe}
                />
        </div>
    )
}