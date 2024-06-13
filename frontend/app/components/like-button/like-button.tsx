import axios from "axios";
import { useState } from "react";

async function addLikeToPost(id: number, callback: Function) {
    const {data: {data: {likes: likes}}} = await axios.get(`http://localhost:8055/items/posts/${id}`);
    console.log(likes);

    const {data} = await axios.patch(`http://localhost:8055/items/posts/${id}`, {
        likes: likes + 1
    });


    // window.localStorage.setItem('liked', JSON.stringify([id]))

    callback(data.data.likes);
  }
  
export default function LikeButton({postId, likes}: {postId: number, likes: number}) {
    const [likeState, setLikeState] = useState(likes);
    const [active, setActive] = useState();

    return (
        <div onClick={() => addLikeToPost(postId, setLikeState)}>{likeState} 👍</div>
    )
}