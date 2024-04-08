import "./Admin.css";
import { searchData } from "../../app/slices/searchSlice";
import { userData } from "../../app/slices/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUsers, DeleteUser, UpdateProfile } from "../../services/apiCalls";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";

const numUserDisplay = 5;

export const Admin = () => {
    //Instancia de Redux en modo lectura para home
    // const searchRdx = useSelector(searchData);
    useEffect(() => {
    }, []);
    //Instancia de Redux para escritura y lectura (ver y editar )
    const dispatch = useDispatch();
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
    const [rowNumbers1, setRowNumbers1] = useState([]);
    const [roleStorage, setRoleStorage] = useState();
    const [currentPageU, setCurrentPageU] = useState(1);
    const [usersPerPage] = useState(numUserDisplay); // Number of users per page

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
    // useEffect(() => {
    //     const numbers1 = users.map((_, index) => index + 1);
    //     setRowNumbers1(numbers1);
    // }, [users]);
    const deleteUser = async (_id) => {
        try {
            await DeleteUser(tokenStorage, _id);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== _id));
        } catch (error) {
            throw new Error('Failed to delete user: ', error.message);
        }
    };
    const pageCountUsers = Math.ceil(users.length / numUserDisplay);
    const handlePageClickUsers = ({ selected }) => {
        setCurrentPageU(selected); // Update current page for users
    };
    const indexOfLastUser = currentPageU * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    return (
        <>
            <div className="adminDesign">
                <div className="totalUsers">Total Users: {users.length}</div>
                {currentUsers.map((user, index) => (
                    <div className={`userCard ${rowNumbers1[index] % 2 == 0 ? "grayBg" : ""}`} key={user._id}>
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
            </div>
        </>
    )
}

