import { posts, categories } from '#site/content';
import Post from "@/components/post/post";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { Suspense, useEffect, useState } from "react";
import Nav from "@/components/nav/nav";
import Menu from "@/components/menu/menu";
import BasePost from "@/types/post";

export default function Home() {
  const filter = useSearchParams()?.get('filter');

  const [allPosts, setAllPosts] = useState(posts)
  const [shownPosts, setShownPosts] = useState<BasePost[]>([]);


  useEffect(() => {
    const workingPosts = [...allPosts]

    const sortedPosts = workingPosts.sort((postOne, postTwo) => {
      return new Date(postTwo.date).valueOf() - new Date(postOne.date).valueOf();
    })

    if (filter) {
      const filteredPosts = sortedPosts.filter(post => post.category === filter);
      setShownPosts(filteredPosts);
    } else {
      setShownPosts(sortedPosts);
    }
  }, [filter, setShownPosts])

  return (
    <>
      <Nav></Nav>
      <main id="index">
        <div className="post-container">
          <div className="post-list">
            {shownPosts.map(post => <Post key={post.slug} post={post}></Post>)}
          </div>
        </div>
      </main>
      <Menu></Menu>
    </>
  );
}
