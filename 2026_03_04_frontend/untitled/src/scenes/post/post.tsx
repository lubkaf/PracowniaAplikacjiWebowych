import styles from "./post.module.scss";
import { useQuery } from "@tanstack/react-query";
import type { Post } from "../../types/post/Post";
import { useParams } from "react-router";

interface PostWithComments extends Post {
    Komentarze: {
        id: number;
        Komentarz: string;
    }[];
}

export default function Post() {
    const { id } = useParams<{ id: string }>();

    const {
        data: post,
        isLoading,
        isError,
    } = useQuery<PostWithComments>({
        queryKey: ["post", id],
        queryFn: () =>
            fetch(`http://localhost:3000/wpis/${id}`).then((res) => {
                if (!res.ok) throw new Error("Post not found");
                return res.json();
            }),
        enabled: !!id,
    });

    if (isLoading) return <main className={styles.Main}><p>Loading...</p></main>;
    if (isError || !post) return <main className={styles.Main}><p>Error loading post.</p></main>;

    return (
        <main className={styles.Main}>
            <div className={styles.PostContent}>
                {/* Zwróć uwagę na nazwy pól: w Prisma masz 'Text', nie 'Title' */}
                <h1>Wpis # {post.id}</h1>
                <p>{post.Text}</p>
            </div>

            <div className={styles.CommentsSection}>
                {/* Dobieramy się do Komentarzy prosto z obiektu post */}
                <h2>Comments ({post.Komentarze?.length || 0})</h2>

                {post.Komentarze?.length === 0 ? (
                    <p className={styles.NoComments}>No comments yet</p>
                ) : (
                    <div className={styles.CommentsList}>
                        {post.Komentarze.map((comment) => (
                            <div key={comment.id} className={styles.Comment}>
                                <div className={styles.CommentHeader}>
                                    <strong>ID: {comment.id}</strong>
                                </div>
                                {/* W Prisma pole tekstowe komentarza nazywa się 'Komentarz' */}
                                <p className={styles.CommentBody}>{comment.Komentarz}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}