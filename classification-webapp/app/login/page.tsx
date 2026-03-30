import HeaderComponent from "../components/Header";
import Link from "next/link";
import styles from "@styles/login.module.css"
export default function Login() {
    return (
        <>
        <HeaderComponent isAuthenticated={false}/>
        <div className={styles.loginWrapper}>
            <h1 className={styles.title}>Welcome back</h1>
            <div className={styles.loginForm}>
                <input type="text" className={styles.input} placeholder="Email"></input>
                <input type="password" className={styles.input} placeholder="Password"></input>
                <button className={styles.loginButton}>Log In</button>
                <p>Don't have an account? <Link href='/signup'>Sign up</Link></p>
            </div>
        </div>
        </>
    )
}