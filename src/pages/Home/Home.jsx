import "./Home.css"
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GetPosts, LikePost, CreatePost } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { searchData } from "../../app/slices/searchSlice";
import { useEffect } from "react";
import { userData } from "../../app/slices/userSlice";
import { CInput } from "../../common/CInput/CInput";
import { useDispatch } from "react-redux";
import { updateDetail } from "../../app/slices/postSlice";




export const Home = () => {
    const dispatch= useDispatch()
    const navigate = useNavigate()
    const rdxUser = useSelector(userData)
    const token = rdxUser.credentials.token
    
    const manageDetail = (post) => {
        dispatch(updateDetail({detail:post}));
        
        navigate("/detail");
    };

    useEffect(() => {
        if (!token)
            navigate('/login')
    }, [rdxUser]);

    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getDataPosts = async () => {
            try {
                const fetched = await GetPosts(token)
                setPosts(fetched.data)
            } catch (error) {
                throw new Error('Cant get data  Posts' + error.message);

            }
        }
        getDataPosts()
    }, [posts, token])

    const likeUnlike = async (post_id) => {
        try {
            const fetched = await LikePost(token, post_id);
            // Encuentra el post que ha sido "likeado" y actualiza su estado
            if (fetched.data && fetched.data._id) {
                setPosts(posts.map(post => post._id === post_id ? fetched.data : post));
            } 
        } catch (error) {
            throw new Error('Cant likeUnLike Post' + error.message);
        }
    }

    // Estados para los valores de los campos de entrada
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Función para manejar el cambio de los campos de entrada
    const handleChange = (e) => {
        if (e.target.name === "title") {
            setTitle(e.target.value);
        } else if (e.target.name === "description") {
            setDescription(e.target.value);
        }
    };

    // Función para crear un post
    const newPost = async () => {
        try {
            const post = { title, description }; // Aquí defines el post que quieres crear
            const newPost = await CreatePost(token, post);
            // Añade el nuevo post a la lista de posts
            // Limpia los campos de entrada
            setTitle("");
            setDescription("");
        } catch (error) {
            throw new Error('Cant create new Post ' + error.message);
        }
    };
    
    return (
        <div className="homeDesign">
             <div>
                <CInput
                    type="text"
                    placeholder="Título"
                    name="title"
                    value={title}
                    changeEmit={handleChange}
                />
                <CInput
                    type="text"
                    placeholder="Descripción"
                    name="description"
                    value={description}
                    changeEmit={handleChange}
                />
                <button onClick={newPost}>Crear Post</button>
            </div>
            {posts.map((post) => (
                <div className="postCard" >
                    <div className="postDetail" onClick={() => manageDetail(post)} key={post._id}>detail<div className="cardHeader" >
                    <div className="username">{post.userId ?( post.userId.username.length > 10 ? post.userId.username.substring(0,10) + ".." : post.userId.username ) : 'Usuario desconocido'}</div>
                        <div className="title">{post.title.length > 10 ? post.title.substring(0,10) + ".." : post.title }</div>
                    </div></div>
                    <div className="cardBody">
                        <div className="likes">Likes: {post.likes.length}</div>
                        <div className="description">{post.description.length > 10 ? post.description.substring(0,10) + ".." : post.description}</div>
                        <button className="likeUnLike" onClick={() => likeUnlike(post._id)}>Like!</button>
                    </div>
                </div>
            )).reverse()}
        </div>
    )
}