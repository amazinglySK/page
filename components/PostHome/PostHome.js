import { GetPosts } from "@contentful/postHandlers";
import PostCard from "@components/PostCard/PostCard";
import { useEffect, useState } from "react";
import styles from "./PostHome.module.css";


export default function PostHome() {
    let [isLoaded, setLoaded] = useState(true);
    let [data, setData] = useState([]);
    let [iter, setIter] = useState(0);
    let [isMore, setMore] = useState(true);

    function LoadMorePosts() {
        setLoaded(false)
        GetPosts(iter, c_tags).then(([posts, more]) => {
            setLoaded(true);
            setData(d => [...d, ...posts])
            setIter(iter + 1)
            setMore(more)
        }).catch(err => alert("oops an error occured"))
    }

    useEffect(() => {
        setLoaded(false);
        GetPosts(iter, tags).then(([posts, more]) => {
            setLoaded(true);
            setData(posts);
            setIter(iter + 1)
            setMore(more)
        });
    }, []);
    
    return (
        <>
            {data && data.map((post) => {
                return (
                    <PostCard
                        title={post.fields.title}
                        desc={post.fields.desc}
                        readingTime={post.fields.readingTime}
                        link={post.fields.slug}
                        tags={post.tags}
                        key={post.sys.id}
                    />
                );
            })}
            {!isLoaded &&  <div>Loading...</div>}
            {isMore && isLoaded && <button className = {styles.loadMore} onClick = {LoadMorePosts} >Load More Posts</button>}
        </>
    );
}
