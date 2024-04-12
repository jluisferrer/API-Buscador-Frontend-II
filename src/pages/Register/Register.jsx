import "./Register.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { validame } from "../../utils/functions";
import { RegisterUser } from "../../services/apiCalls";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export const Register = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: "",
        password: "",
        email: ""
    })

    const [userError, setUserError] = useState({
        usernameError: "",
        emailError: "",
        passwordError: ""
    })

    const [msg, setMsg] = useState("");
    const [msgError, setMsgError] = useState("")

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const checkError = (e) => {
        const error = validame(e.target.name, e.target.value)

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }))
        if (error) {
            toast.error(error);
        }
    }

    const registerMe = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("All fields are requiredFRONT");
                }
            }
            const fetched = await RegisterUser(user);

            console.log(fetched);
            setMsg("Register completed");

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            setMsgError(error.message);
            toast.error(error.message);
        }
    };
    return (
        <div className="registerDesign">
            <ToastContainer />
            {msg === "" ? (
                <div className="registerDesign">
                    <div className="error">{msgError}</div>
                    <CInput
                        className={`inputDesign ${userError.usernameError !== "" ? "inputDesignError" : ""
                    }`}
                        type="text"
                        placeholder="Choose an username"
                        name="username"
                        value={user.username || ""}
                        changeEmit={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                     <div className="inputDesignError">{userError.usernameError}</div>
                    <CInput
                        className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
                            }`}
                        type="email"
                        placeholder="Write your email"
                        name="email"
                        value={user.email || ""}
                        changeEmit={(e) => inputHandler(e)}
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
                        changeEmit={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="inputDesignError">{userError.passwordError}</div>
                    <CButton
                        className={"cButtonDesign"}
                        title={"Register"}
                        functionEmit={registerMe}
                    />
                </div>
            ) : (
                <div>
                    <div>{msg}</div>
                </div>
            )}
        </div>
    )
};