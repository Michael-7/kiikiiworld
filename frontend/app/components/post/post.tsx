
import { Photo, PostType, Project, Quote, Story, Video } from "~/types/post-types";
import "./post.scss";
import { useNavigate } from "@remix-run/react";
import LikeButton from "../like-button/like-button";

function getPostSpecificHtml(post: Video|Photo|Quote|Story|Project, autoScale: boolean) {
  const nav = useNavigate();

  switch (post.type) {
    case PostType.photo:
      return <img src={getImageUrl(post.image)} className={autoScale ? 'post__image' : 'post'}  onClick={() => {!autoScale && nav(`../${post.id}`)}} />
    case PostType.quote:
      return <span className="post__quote">{post.markdown}</span>
    case PostType.video:
      return (
        <p>{post.videoUrl}</p>
        // <iframe width="100%" height="315" className="post__video"
        //   src={post.videoUrl}
        //   title="YouTube video player"
        //   frameBorder="0"
        //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        //   referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
        // </iframe>
        )
  }

  return <p>Unkown Post Type</p>
}

function formatDate(inputDate: string): string {
  let formatDate = new Date(inputDate);
  return formatDate.toLocaleDateString();
}

function getImageUrl(id: string): string {
  return `http://localhost:8055/assets/${id}`
}

export default function Post({post, autoScale}: {post: Photo|Video|Quote, autoScale: boolean}) {
  return (
    <div className="post">
      <div className="post__content">
        {getPostSpecificHtml(post, autoScale)}
      </div>
      <div className="post__details">
        <span className="post__title">{post.title}</span>
        <span className="post__date">{formatDate(post.displayDate)}</span>
        <LikeButton postId={post.id} likes={post.likes}></LikeButton>
      </div>
    </div>
  )
}