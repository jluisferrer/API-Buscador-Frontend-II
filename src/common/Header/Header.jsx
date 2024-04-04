import "./Header.css"
import { CLink } from "../CLink/CLink"
import { useSelector, useDispatch } from "react-redux"
import { userData, logout } from "../../app/slices/userSlice"
import { useEffect } from "react"


export const Header = () => {
    //instancia de conexion a modo lectura
    const rdxUser = useSelector(userData)
    //instancia de conexion a modo escritura

    const dispatch = useDispatch()

    useEffect(() => {
        console.log(rdxUser, " credenciales pasaporte");
    }, [rdxUser]);
    return (
        <div className="headerDesign">
            <CLink path="/" title="Home" />
            {rdxUser?.credentials?.token ? (
                <div className="navigatorDesign">
                    <CLink path="/profile" title={rdxUser?.credentials?.user?.userName} />
                    <div
                        className="outDesign"
                        onClick={() => dispatch(logout({ credentials: "" }))}
                    >
                        log out
                    </div>
                </div>
            ) : (
                <div className="navigatorDesign">
                    <CLink path="/login" title="Login" />
                    <CLink path="/register" title="Register" />
                </div>
            )}
        </div>
    );
};