import { posts, categories } from '#site/content';

export default function blog()  {
    const displayPosts = posts;
    const dispCategories = categories;
   
    console.log(displayPosts);
    console.log(dispCategories);
    

    return (
        <p>BLOG PAGE</p>
    )
}