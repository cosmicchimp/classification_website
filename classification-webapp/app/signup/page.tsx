import HeaderComponent from "../components/Header";
import Link from "next/link";
import styles from "@styles/signup.module.css"
export default function Signup() {
    return (
        <>
        <HeaderComponent/>
        <div className={styles.signupWrapper}>
            <div className={styles.signupForm}>
                <h1 className={styles.title}>Create an account</h1>
                <input type="text" className={styles.input} placeholder="Email"></input>
                <input type="password" className={styles.input} placeholder="Password"></input>
                <input type="password" className={styles.input} placeholder="Confirm password"></input>
                <button className={styles.signupButton}>Signup</button>
            </div>
        </div>
        </>
    )
}