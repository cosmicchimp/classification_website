import HeaderComponent from "../components/Header";
import Link from "next/link";
import styles from "@styles/signup.module.css"
export default function Signup() {
    return (
        <>
        <HeaderComponent isAuthenticated={false}/>
        <div className={styles.signupWrapper}>
            <h1 className={styles.title}>Create your account</h1>
            <div className={styles.signupForm}>
                <input type="text" className={styles.input} placeholder="Email"></input>
                <input type="password" className={styles.input} placeholder="Password"></input>
                <input type="password" className={styles.input} placeholder="Confirm password"></input>
                <button className={styles.signupButton}>Signup</button>
                <Link href="/login">Return to login</Link>
            </div>
        </div>
        </>
    )
}