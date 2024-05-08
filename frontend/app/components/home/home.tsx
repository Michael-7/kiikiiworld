import { Video, Photo, Quote, PostType } from "~/types/post-types"
import "./home.scss";
import Post from "../post/post";
import { useState } from "react";
import { useSearchParams } from "@remix-run/react";

const posts: Array<Video|Photo|Quote> = [
  {
    type: PostType.photo,
    date: new Date().toISOString(),
    title: 'Lelylaan, Amsterdam',
    tags: ['new', 'travel'],
    url: 'https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Play_10_years.width-1600.format-webp.webp'
  },
  {
    type: PostType.video,
    date: new Date().toISOString(),
    title: 'New Zealand ~ 2020',
    tags: ['new', 'travel'],
    url: 'https://www.youtube.com/embed/JenkjO3Fo4A?si=xBTgXfcHvVxj7B-C'
  },
  {
    type: PostType.quote,
    date: new Date().toISOString(),
    title: 'Jed McKenna, Spiritual Enlightenment: The Damnest Thing',
    tags: ['new', 'travel'],
    quote: 'All belief systems are just the stories we create in order to deal with the void. Ego abhors a vacuum, so everybody’s scrambling to create the illusion of something where there’s nothing. Belief systems are simply the devices we use to explain away the unthinkable horror of no-self.'
  }
]

function getPosts(): Array<Video|Photo|Quote>  {
  // const response = await fetch("http://example.com/movies.json");
  // const movies = await response.json();
  // console.log(movies);

  return posts
}

function postListHtml(posts: Array<Video|Photo|Quote>, filter: string|null) {
  let filteredPosts = posts;
  if (filter) {
    filteredPosts = posts.filter(p => p.type === filter);
  }
  return filteredPosts.map((post, id) => <Post post={post} key={id}></Post>)
}

export default function Home() {
  const [posts, setPosts] = useState(() => getPosts());
  const [searchParams, setSearchParams] = useSearchParams();

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