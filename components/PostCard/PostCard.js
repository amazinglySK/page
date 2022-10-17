import Link from "next/link";
import styles from "./PostCard.module.css";

export default function PostCard({ readingTime, title, desc, link, tags }) {
    console.log(tags);
    return (
        <Link href={`/blog/${link}`}>
            <div className={styles.card}>
                <p className={styles.reading_time}>{readingTime} min</p>
                <h1 className={styles.title}>{title}</h1>
                <p className={styles.description}>{desc}</p>
                <div className={styles.tags}>
                    {tags.map((t, i) => {
                        return <span key={i}>{t}</span>;
                    })}
                </div>
                <hr />
            </div>
        </Link>
    );
}
