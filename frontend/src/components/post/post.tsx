import BasePost from "@/types/post";
import { Categories } from "@/types/categories";
import { MDXContent } from "../mdx/mdx";

function getPostSpecificHtml(post: BasePost) {
  switch (post.category) {
    case Categories.photo:
      return <img src={post.image && getImageUrl(post.image)} className="post__content" alt={post.title} />
      // if (post.image) {
      //   return <Image src={post.image && getImageUrl(post.image)} alt={post.title}></Image>
      // }
    case Categories.quote:
      return <MDXContent code={post.body} components={{}} />
    case Categories.video:
      return (
        <p>{post.video}</p>
        // <iframe className="post__video"
        //   src={post.video}
        //   title="YouTube video player"
        //   frameBorder="0"
        //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        //   referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
        // </iframe>
        )
    case Categories.story:
      // return <p>{post.description}</p>
      return <MDXContent code={post.body} components={{}} />
    case Categories.project:
      return <MDXContent code={post.body} components={{}} />
  }

  return <p>* ERROR: UNKNOWN POST TYPE *</p>
}

function formatDate(inputDate: string): string {
  let formatDate = new Date(inputDate);
  return formatDate.toLocaleDateString('en-US', {  
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getImageUrl(id: string): string {
  return `/blog/${id}`
}

export default function Post({post}: {post: BasePost}) {
  return (
    <div id="post">
      <div className="post">
        <div className="post__content">
          {getPostSpecificHtml(post)}
        </div>
        <div className="post__details">
          <span className="post__title">{post.title}</span>
          <span className="post__date">{formatDate(post.date)}</span>
        </div>
      </div>
    </div>
  )
}