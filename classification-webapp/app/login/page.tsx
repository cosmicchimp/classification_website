import HeaderComponent from "../components/Header";
import Link from "next/link";
import styles from "@styles/login.module.css"
export default function Login() {
    return (
        <>
        <HeaderComponent/>
        <div className={styles.loginWrapper}>
            <div className={styles.loginForm}>
                <h1 className={styles.title}>Welcome back</h1>
                <input type="text" className={styles.input} placeholder="Email"></input>
                <input type="password" className={styles.input} placeholder="Password"></input>
                <button className={styles.loginButton}>Log In</button>
                <p>Don't have an account? <Link href='/signup'>Sign up</Link></p>
            </div>
        </div>
        </>
    )
}