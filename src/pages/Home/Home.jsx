import "./Home.css"
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GetPosts, LikePost } from "../../services/apiCalls";
import { useNavigate } from 'react-router-dom';
import { searchData } from "../../app/slices/searchSlice";
import { useEffect } from "react";
import { userData } from "../../app/slices/userSlice";




export const Home = () => {

    const navigate = useNavigate()
    const rdxUser = useSelector(userData)
    const token = rdxUser.credentials.token

    // const searchRdx = useSelector(searchData)

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
                console.log(error)
            }
        }
        getDataPosts()
    }, [posts, token])

    const likeUnlike = async (post_id) => {
        try {
            const fetched = await LikePost(rdxUser?.credentials?.token, post_id);
            // Encuentra el post que ha sido "likeado" y actualiza su estado
            if (fetched.data && fetched.data._id) {
                setPosts(posts.map(post => post._id === post_id ? fetched.data : post));
            } 
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="homeDesign">
            {posts.map((post) => (
                <div className="postCard" key={post._id}>
                    <div className="cardHeader">
                        <div className="username">{post.userId.username}</div>
                        <div className="title">{post.title}</div>
                    </div>
                    <div className="cardBody">
                        <div className="likes">Likes: {post.likes.length}</div>
                        <div className="description">{post.description}</div>
                        <button className="likeUnLike" onClick={() => likeUnlike(post._id)}>Like!</button>
                    </div>
                </div>
            ))}
        </div>
    )
}