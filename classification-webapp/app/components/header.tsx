import Link from "next/link"
import styles from "@styles/header.module.css"
export default function HeaderComponent() {
    return (
        <div className={styles.headerWrapper}>
            <h1 className={styles.title}><Link href={"/"}>AnimalScan</Link></h1>
            <div className={styles.linkList}>
                <div className={styles.link}><Link href={"/"}>Home</Link></div>
                <div className={styles.link}><Link href={"/login"}>Login</Link></div>
            </div>
        </div>
    )
}