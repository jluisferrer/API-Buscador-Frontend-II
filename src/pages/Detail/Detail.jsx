import "./Detail.css"
import { useSelector } from "react-redux"
import { detailData } from "../../app/slices/postSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LikePost } from "../../services/apiCalls"
import { userData } from "../../app/slices/userSlice"


export const Detail = () => {
    const detailRdx = useSelector(detailData)
    console.log(detailRdx)
    const navigate = useNavigate();
    const rdxUser = useSelector(userData)
    const token = rdxUser.credentials.token
    
    
    useEffect(() => {
        if (!detailRdx?.detail?._id) {
            navigate("/")
        }
    }, [detailRdx])
   
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
    return (
        detailRdx?.detail?._id &&
        <div className="detailDesign">
            <div className="postCard">
                <div className="cardHeader">
                    <div className="title">Title:{detailRdx?.detail?.title}</div>
                    <div className="username">User:{detailRdx?.detail?.userId?.username}</div>
                </div>
                <div className="cardBody">
                    <div className="description">{detailRdx?.detail?.description}</div>
                    <div className="likes">Likes: {detailRdx?.detail?.likes.length}</div>
                    <div className="likes">Created at: {detailRdx?.detail?.createdAt}</div>
                    <button className="likeUnLike" onClick={() => likeUnlike(detailRdx?.detail?._id)}>Like!</button>
                </div>
            </div>
        </div>
    )
}