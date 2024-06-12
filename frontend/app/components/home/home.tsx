import { Video, Photo, Quote, PostType } from "~/types/post-types"
import "./home.scss";
import Post from "../post/post";
import { useState, useEffect } from "react";
import { useSearchParams } from "@remix-run/react";

async function getPosts(): Promise<Array<Video|Photo|Quote>>  {
  const response = await fetch("http://localhost:8055/items/posts?sort=displayDate");
  const movies = await response.json();

  return movies.data
}

function postListHtml(posts: Array<Video|Photo|Quote>, filter: string|null) {
  let filteredPosts = posts;
  if (filter) {
    filteredPosts = posts.filter(p => p.type === filter);
  }
  return filteredPosts.map((post, id) => <Post post={post} key={id}></Post>)
}

export default function Home() {
  const [posts, setPosts] = useState<Array<Video|Photo|Quote>>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then(result => {
      setPosts(result)
      setLoading(false);
    })
  }, [isloading])

  return (
    <div id="home">
      <div className="container">
        <div className="content">
          {postListHtml(posts, searchParams.get('contentType'))}
        </div>
      </div>
    </div>
  )
}