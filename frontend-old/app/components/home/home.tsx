import { Video, Photo, Quote, PostType } from "~/types/post-types"
import "./home.scss";
import Post from "../post/post";
import { useState, useEffect } from "react";
import { useSearchParams } from "@remix-run/react";
import axios, { AxiosResponse } from "axios";

async function getPosts(): Promise<AxiosResponse>  {
  return axios.get("http://localhost:8055/items/posts?sort=displayDate");
}

function postListHtml(posts: Array<Video|Photo|Quote>, filter: string|null) {
  let filteredPosts = posts;
  if (filter) {
    filteredPosts = posts.filter(p => p.type === filter);
  }
  return filteredPosts.map((post, id) => <Post post={post} autoScale={false} key={id}></Post>)
}

export default function Home() {
  const [posts, setPosts] = useState<Array<Video|Photo|Quote>>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isloading, setLoading] = useState(true);

  useEffect(() => {
    getPosts().then(result => {
      console.log(result)
      setPosts(result.data.data);
      setLoading(false);
    })
  }, [setPosts, setLoading])

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