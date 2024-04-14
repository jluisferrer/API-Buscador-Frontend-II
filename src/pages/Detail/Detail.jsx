import "./Detail.css"
import { useSelector } from "react-redux"
import { detailData } from "../../app/slices/postSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LikePost } from "../../services/apiCalls"
import { userData } from "../../app/slices/userSlice"
import dayjs from "dayjs"


export const Detail = () => {
    const detailRdx = useSelector(detailData)
    console.log(detailRdx)
    const navigate = useNavigate();
    const rdxUser = useSelector(userData)
    const token = rdxUser.credentials.token
    
    useEffect(() => {
        if (!token)
            navigate('/login')
    }, [rdxUser]);
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
            <div className="postCardDetail">
                <div className="cardHeaderDetail">
                    <div className="titleDetail">Title:{detailRdx?.detail?.title}</div>
                    <div className="titleDetail">User:{detailRdx?.detail?.userId?.username}</div>
                </div>
                <div className="cardBody">
                    <div className="descriptionDetail"><strong>Desription:</strong>{detailRdx?.detail?.description}</div>
                    {/* <div className="likes">Likes: {detailRdx?.detail?.likes.length}</div> */}
                    <div className="likesDetail">Created at: {dayjs(detailRdx?.detail?.createdAt).locale('es').format('D MMMM YYYY, h:mm a')}</div>
                    <button className="likeUnLikeDetail" onClick={() => likeUnlike(detailRdx?.detail?._id)}>Like!</button>
                </div>
            </div>
        </div>
    )
}