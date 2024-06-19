import { useParams } from "@remix-run/react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import Post from "~/components/post/post";
import { Photo, Quote, Video } from "~/types/post-types";

const styles = {
  wrapper: {
    padding: '8px',
    height: 'auto',
  },
  post: {
    width: 'min-content',
    minWidth: '400px',
    margin: 'auto',
  }
}

async function getPost(id: string): Promise<AxiosResponse>  {
  return axios.get(`http://localhost:8055/items/posts/${id}`);
}

export function getStaticPaths() {
  return ["/"];
}

export default function Index() {
  const params = useParams();
  const [post, setPost] = useState<Video|Photo|Quote>();


  
  useEffect(() => {
    if (params.contentId) {
      getPost(params.contentId).then(post => {
        setPost(post.data.data);
      })
    }
  }, [getPost]);

  return (
    <div style={styles.wrapper}>
      <div style={styles.post}>
        {post ? <Post post={post} autoScale={true}></Post> : <p>No post found</p>}
      </div>
    </div>
  );
}
