
import { Photo, PostType, Project, Quote, Story, Video } from "~/types/post-types";
import "./post.scss";

function getPostSpecificHtml(post: Video|Photo|Quote|Story|Project) {
  switch (post.type) {
    case PostType.photo:
      return <img src={post.url} className="post" />
    case PostType.quote:
      return <span className="post__quote">{post.quote}</span>
    case PostType.video:
      return (
        <iframe width="100%" height="315" className="post__video"
          src={post.url}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
        </iframe>
        )
  }

  return <p>Unkown Post Type</p>
}

function formatDate(inputDate: string): string {
  let formatDate = new Date(inputDate);
  return formatDate.toLocaleDateString();
}

export default function Post({post}: {post: Photo|Video|Quote}) {
  return (
    <div className="post">
      <div className="post__content">
        {getPostSpecificHtml(post)}
      </div>
      <div className="post__details">
        <span className="post__title">{post.title}</span>
        <span className="post__date">{formatDate(post.date)}</span>
      </div>
    </div>
  )
}