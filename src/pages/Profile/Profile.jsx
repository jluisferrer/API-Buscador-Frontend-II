import "./Profile.css"
import { useSelector, useDispatch } from "react-redux"
import { userData } from "../../app/slices/userSlice"
import { useNavigate } from "react-router"
import { useState, useEffect } from "react"
import { CInput } from "../../common/CInput/CInput"
import { CButton } from "../../common/CButton/CButton"
import { GetProfile, UpdateProfile, GetUserPosts } from "../../services/apiCalls"
import { profile } from "../../app/slices/userSlice"




export const Profile = () => {

    const navigate = useNavigate()
    const [write, setWrite] = useState("disabled")
    const [msg, setMsg] = useState("");
    const [loadedData, setLoadedData] = useState(false)

    const [user, setUser] = useState({
        username: "",
        email: "",
        role: ""
    })

    const [userError, setUserError] = useState({
        usernameError: "",
        emailError: "",
        roleError: ""
    })

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    //instaciamos redux para escritura y lectura de perfil
    const dispatch = useDispatch();
    const rdxUser = useSelector(userData)

    useEffect(() => {
        if (!rdxUser?.credentials?.token) {
            navigate("/")
        }
    }, [rdxUser])

    const [tokenStorage, setTokenStorage] =
        useState(rdxUser.credentials.token)
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const fetched = await GetProfile(tokenStorage)
                setUser({
                    username: fetched.data.username,
                    email: fetched.data.email,
                    role: fetched.data.role
                })
                setLoadedData(true)
            } catch (error) {
                throw new Error(`Get user profile failed` + error.message)
            }
        }
        if (!loadedData) {
            getUserProfile()
        }
    }, [tokenStorage])

    const updateData = async () => {
        const userData = {
            username: user.username,
            email: user.email,
            role: user.role
        }
        try {
            const updatedProfile = await
                UpdateProfile(rdxUser.credentials.token, userData)
            setUser(updatedProfile)
            setLoadedData(false)
            setWrite("disabled")

            setMsg("Profile updated, please relog")
            navigate("/login")
            setTimeout(() => {
                dispatch(profile({ credentials: userData }))
            }, 2000)
        } catch (error) {
            throw new Error(`Updating profile failed:` + error.message)
        }

    }
    
    const [myPosts, setMyPosts] = useState([]);
    useEffect(() => {
        const getMyPostsData = async () => {
            try {
                const fetched = await GetUserPosts(tokenStorage)
                setMyPosts(fetched.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMyPostsData()
    }, [myPosts, tokenStorage])
    return (
        <>
            <div className="profileDesign">
                {<><div>Name:
                    <CInput className={`inputDesign ${userError.usernameError !== "" ? "inputDesignError" : ""}${write === ""}`}
                        type="text"
                        placeholder=""
                        name="username"
                        disabled={write}
                        value={user.username || ""}
                        changeEmit={(e) => inputHandler(e)}
                    />
                </div>
                    <div>Email:
                        <CInput className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""}${write === ""}`}
                            type="email"
                            placeholder=""
                            name="email"
                            disabled="disabled"
                            value={user.email || ""}
                            changeEmit={(e) => inputHandler(e)}
                        />
                    </div>
                    <div>Role
                        <CInput className={`inputDesign ${userError.roleError !== "" ? "inputDesignError" : ""}${write === ""}`}
                            type="text"
                            placeholder=""
                            name="role"
                            disabled="disabled"
                            value={user.role || ""}
                            changeEmit={(e) => inputHandler(e)}
                        />
                    </div>
                    <CButton
                        className={(write === "") ? "btn cButtonDesignProfile" : "btn cButtonDesignProfile"}
                        title={write === "" ? "Confirm" : "Edit"}
                        functionEmit={write === "" ? updateData : () => setWrite("")}
                    />
                </>}
                {myPosts.map((post, index) => (
                    <div key={index} className="postCard">
                        <div className="cardHeader">
                            <div className="title">{post.title}</div>
                            <div className="actions">
                                <button className="edit">Edit</button>
                                <button className="del">Delete</button>
                            </div>
                        </div>
                        <div className="cardBody">
                            <div className="description">{post.description}</div>
                            <div className="likes">Likes: {post.likes.length}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )

}