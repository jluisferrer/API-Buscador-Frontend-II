import "./Header.css"
import { CLink } from "../CLink/CLink"
import { useSelector, useDispatch } from "react-redux"
import { userData, logout } from "../../app/slices/userSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { CInput } from "../CInput/CInput"

import { updateCriteria } from "../../app/slices/searchSlice";



export const Header = () => {
    const navigate = useNavigate()
    //instancia de conexion a modo lectura
    const rdxUser = useSelector(userData)
    //instancia de conexion a modo escritura
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(rdxUser, " credenciales pasaporte");
    }, [rdxUser]);

    const [criteria, setCriteria] = useState("");

    const searchHandler = (e) => {
        setCriteria(e.target.value)
    }
    useEffect(() => {
        if (criteria !== "") {
            //saving in redux
            dispatch(updateCriteria(criteria))
        }
    }, [criteria])
    return (
        <div className="headerDesign">
            {/* BARRA DE BÚSQUEDA */}
            <CInput
                type="text"
                name="criteria"
                value={criteria || ""}
                changeEmit={searchHandler}
            />
            <CLink path="/" title="Home" />
            {rdxUser?.credentials?.token ? (
                <>
                    <div>
                        {(rdxUser?.credentials?.user?.roleName === "super_admin") && (
                            <div className="navigatorDesign">
                                <CLink path="/admin" title="ADMINPANEL" />
                            </div>
                        )}
                    </div>
                    <div className="navigatorDesign">
                        <CLink path="/profile" title={rdxUser?.credentials?.user?.userName} />
                        <div
                            className="outDesign"
                            onClick={() => dispatch(logout({ credentials: "" }))}
                        >
                            Log out
                        </div>
                    </div>
                </>
            ) : (
                <div className="navigatorDesign">
                    <CLink path="/login" title="Login" />
                    <CLink path="/register" title="Register" />
                </div>
            )}
        </div>
    );
};