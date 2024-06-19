import axios from "axios";
import { useEffect, useState } from "react";
import "./like-button.scss";

async function addLikeToPost(id: number, callback: Function) {
    const {data: {data: {likes: likes}}} = await axios.get(`http://localhost:8055/items/posts/${id}`);

    let likeIds = window.localStorage.getItem('liked');

    if(likeIds?.includes(id.toString())) {
        return;
    }

    const {data} = await axios.patch(`http://localhost:8055/items/posts/${id}`, {
        likes: likes + 1
    });

    if (likeIds) {
        window.localStorage.setItem('liked', JSON.stringify([id, ...JSON.parse(likeIds)]));
    } else {
        window.localStorage.setItem('liked', JSON.stringify([id]));
    }

    callback({likes: data.data.likes, liked: true});
  }
  
export default function LikeButton({postId, likes}: {postId: number, likes: number}) {
    const [likeState, setLikeState] = useState({
        likes,
        liked: false
    });

    useEffect(() => {
        let likedIds = window.localStorage.getItem('liked');
        let likedIdsParsed: number[] = likedIds ? JSON.parse(likedIds) : [];
        console.log(likedIds);
        if (likedIdsParsed.includes(postId)) {
            setLikeState({...likeState, liked: true});
        }
    }, [setLikeState])

    return (
        <div onClick={() => addLikeToPost(postId, setLikeState)}
            className={likeState.liked ? 'like-button like-button--active' : 'like-button'}>
            {likeState.likes} {likeState.liked ? '✅' : '👍'}
        </div>
    )
}