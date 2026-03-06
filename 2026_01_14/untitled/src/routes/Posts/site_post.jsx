import {useEffect, useState} from "react";
import {Link} from "react-router";
import styles from "./site_post.module.scss";

export default function Site_post(){
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [posts, setPosts] = useState([])


    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(json => setPosts(json))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))

    })


    return(
        <>
           <h1>Posty</h1>
            <div className={styles.Posts}>
                {isLoading && (
                    <>Trwa ładowanie...</>
                )}
                {isError && (
                    <>Wystąpił nieoczekiwany błąd 😥</>
                )}
                {!isLoading && !isError && (
                    <>
                    {posts.length > 0 && (
                        <>
                            {posts.map((post) => (
                                <div className={styles.PostsPost} key={post.id}>
                                    <h4 className={styles.PostsPostTitle}>
                                        {post.title}
                                    </h4>
                                    <p className={styles.PostPostsBody}>
                                        {post.body.substring(0, 50)}...
                                    </p>
                                    <Link
                                        to={`/posts/${post.id}`}
                                        className={styles.PostsPostLink}
                                    >
                                       Przejdź do wpisu
                                    </Link>
                                </div>
                            ))}
                        </>
                    )}
                        {posts.length === 0 && (
                            <>Brak wpisów...</>
                        )}
                    </>
                )}
            </div>
        </>

    )
}