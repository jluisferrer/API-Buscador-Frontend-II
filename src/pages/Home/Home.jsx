import "./Home.css"
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { GetPosts } from "../../services/apiCalls";
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
    return (
        <div className="homeDesign">soy home
            {posts.map((post) => (
                <div className="postCard" key={post._id}>
                    <div className="cardHeader">
                        <div className="username">{post.userId.username}</div>
                        <div className="title">{post.title}</div>
                    </div>
                    <div className="cardBody">
                        <div className="likes">Likes: {post.likes.length}</div>
                        <div className="description">{post.description}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}