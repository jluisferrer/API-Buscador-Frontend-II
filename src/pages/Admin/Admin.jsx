import "./Admin.css";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUsers, DeleteUser, UpdateProfile, GetPosts } from "../../services/apiCalls";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

export const Admin = () => {
    const rdxUser = useSelector(userData);
    const [tokenStorage, setTokenStorage] = useState(rdxUser.credentials.token);
    useEffect(() => {
        if (!tokenStorage) {
            navigate("/login")
        }
    }, [tokenStorage])
    console.log(rdxUser, "rdxUser");
    const navigate = useNavigate();
    const [loadedData, setLoadedData] = useState(false);
    const [users, setUsers] = useState([]);
    const roleStorage = useState();

    useEffect(() => {
        if (roleStorage !== 'superadmin') {
            navigate("/admin")
        }
    }, [])

    useEffect(() => {
        fetchUsers();
    }, []);

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
                <div className="totalUsersAdmin">Total Users {users.length} :</div>
                {users.map((user) => (
                    <div className="userCardAdmin" key={user._id}>
                        <div className="cardHeaderAdmin">
                            <div className="usernameAdmin">Username: {user.username}</div>
                            <div className="actionsAdmin">
                                <button className="del" onClick={() => deleteUser(user._id)}>delete</button>
                                <button className="edit" onClick={() => UpdateProfile(user._id)}>edit</button> {/*futura implementacion... */}
                            </div>
                        </div>
                        <div className="cardBodyAdmin">
                            <div className="followingAdmin"><strong>Following:</strong> {user.following != "" ? user.following : "none"}</div>
                            <div className="followersAdmin"><strong>Followers:</strong> {user.followers != "" ? user.followers : "none"}</div>
                            <div className="emailAdmin"><strong>Email:</strong> {user.email}</div>
                            <div className="createdAtAdmin"><strong>Register since:</strong>{dayjs(user.createdAt).locale('es').format("DD-MM-YYYY")}</div>
                        </div>
                    </div>
                ))}
                <div className="totalPostsAdmin">Total Posts {posts.length} :</div>
                {posts.map((post) => (
                    <div className="postCardAdmin" key={post._id}>
                        <div className="postDetailAdmin" onClick={() => manageDetail(post)}><div className="cardHeader" >
                            <div className="usernameAdmin">{post.userId ? post.userId.username : 'Usuario desconocido'}</div>
                            <div className="titleAdmin">{post.title}</div>
                            <div className="postDetailAdmin">{dayjs(post.createdAt).locale('es').format("DD-MM-YYYY, h:mm a")}</div>
                        </div></div>
                        <div className="cardBody">
                            <div className="likesAdmin">Likes: {post.likes.length}</div>
                            <div className="descriptionAdmin">{post.description}</div>
                        </div>
                    </div>
                )).reverse()}
            </div>
        </>
    )
}

