import styles from "./header.module.scss";

export default function Header() {
    return (
        <header className={styles.Header}>
            <h1>Blog</h1>
            <nav>
                <ul>
                    <li>
                        <a href={"/"}>home</a>
                    </li>
                    <li>
                        <a href={"/posts"}>posts</a>
                    </li>
                </ul>
            </nav>


        </header>
    )
}