import "./Register.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import { validame } from "../../utils/functions";
import { RegisterUser } from "../../services/apiCalls";



export const Register = () => {
    const navigate= useNavigate()
    const[user, setUser] = useState({
        username:"",
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

    const inputHandler = (e)=>{
        setUser((prevState)=>({
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
    }

    const registerMe = async()=>{
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
        }
    };
    return (
        <div className="register-design">
            {msg === "" ? (
                <div className="registerDesign">
                    <div className="error">{msgError}</div>
                    <label className="white-color">Name:</label>
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

                    <label>Email:</label>
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
                    <label>Password:</label>
                    <CInput
                        className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
                            }`}
                        type="password"
                        placeholder="Choose your password"
                        name="password"
                        value={user.password || ""}
                        changeEmit={(e) => inputHandler(e)}
                        onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="inputDesignError">{userError.passwordError}</div>


                    <div className="btn">
                        <div className="btn" onClick={registerMe}>Register</div>
                    </div>

                </div>
            ) : (
                <div>
                    <div>{msg}</div>
                </div>
            )}
        </div>
    )
};