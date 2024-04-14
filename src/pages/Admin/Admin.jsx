import "./Admin.css";
import { searchData } from "../../app/slices/searchSlice";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUsers, DeleteUser, UpdateProfile, GetPosts } from "../../services/apiCalls";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

export const Admin = () => {
    //Instancia de Redux en modo lectura para home
    // const searchRdx = useSelector(searchData);
    useEffect(() => {
    }, []);
    //Instancia de Redux para escritura y lectura (ver y editar )
    // const dispatch = useDispatch();
    const rdxUser = useSelector(userData);
    const [tokenStorage, setTokenStorage] = useState(rdxUser.credentials.token);
    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage])
    console.log(rdxUser, "rdxUser");
    const navigate = useNavigate();
    const [loadedData, setLoadedData] = useState(false);
    const [users, setUsers] = useState([]);
    const roleStorage = useState();

    // solo entra superuser
    useEffect(() => {
        if (roleStorage !== 'superadmin') {
            navigate("/admin")
        }
    }, [])
    // fetching info
    useEffect(() => {
        fetchUsers();
    }, []);

    // traemos usuarios
    const fetchUsers = async () => {
        try {
            if (!tokenStorage) {
                throw new Error("Token is not available");
            }
            const usersData = await GetUsers(tokenStorage);
            setLoadedData(true)
            setUsers(usersData.data)
        } catch (error) {
            throw new Error('Get users failed: ' + error.message);
        }
    };

    const [posts, setPosts] = useState([])
    useEffect(() => {
        const getDataPosts = async () => {

            try {
                const fetched = await GetPosts(tokenStorage)
                setPosts(fetched.data)
            } catch (error) {
                throw new Error('Cant get data  Posts' + error.message);

            }
        }
        if (posts.length === 0) {
            getDataPosts()
        }
    }, [posts, tokenStorage])
    const deleteUser = async (_id) => {
        try {
            await DeleteUser(tokenStorage, _id);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== _id));
        } catch (error) {
            throw new Error('Failed to delete user: ', error.message);
        }
    };
    return (
        <>
            <div className="adminDesign">
                <div className="totalUsers">Total Users: {users.length}</div>
                {users.map((user) => (
                    <div className="userCard" key={user._id}>
                        <div className="cardHeader">
                            <div className="username">Username: {user.username}</div>
                            <div className="actions">
                                <button className="del" onClick={() => deleteUser(user._id)}>delete</button>
                                <button className="edit" onClick={() => UpdateProfile(user._id)}>edit</button>
                            </div>
                        </div>
                        <div className="cardBody">
                            <div className="following"><strong>Following:</strong> {user.following != "" ? user.following : "none"}</div>
                            <div className="followers"><strong>Followers:</strong> {user.followers != "" ? user.followers : "none"}</div>
                            <div className="email"><strong>Email:</strong> {user.email}</div>
                            <div className="createdAt"><strong>Register since:</strong>{dayjs(user.createdAt).format("DD-MM-YYYY")}</div>
                        </div>
                    </div>
                ))}
                <div className="totalPosts">Total Posts: {posts.length}</div>
                {posts.map((post) => (
                    <div className="postCard" key={post._id}>
                        <div className="postDetail" onClick={() => manageDetail(post)} >soy el detalle<div className="cardHeader" >
                            <div className="username">{post.userId ? post.userId.username : 'Usuario desconocido'}</div>
                            <div className="title">{post.title}</div>
                        </div></div>
                        <div className="cardBody">
                            <div className="likes">Likes: {post.likes.length}</div>
                            <div className="description">{post.description}</div>
                            {/* <button className="likeUnLike" onClick={() => likeUnlike(post._id)}>Like!</button> */}
                        </div>
                    </div>
                )).reverse()}
            </div>
        </>
    )
}

