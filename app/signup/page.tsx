'use client'
import { useRouter } from 'next/navigation'
import { useState } from "react";
import HeaderComponent from "../components/Header";
import Link from "next/link";
import styles from "@styles/signup.module.css"
export default function Signup() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [secondPassword, setSecondPassword] = useState("")
    async function createAccount() {
        if (password == secondPassword && regex.test(email)) {
            try {
                await fetch("/api/create-account", {method:"POST", headers: { 'Content-Type': 'application/json',}, 
                    body: JSON.stringify({
                        email:email,
                        password:password   
                    }
                )})
                alert("Account created successfully")
                router.push("/login")
            }
            catch (error) {
                alert("An error occured during the creation of your account, please try again later")
                console.log(error)
            }
        }
        else {
            alert("Please enter a valid email and ensure passwords match.")
        }
    }

    return (
        <>
        <HeaderComponent/>
        <div className={styles.signupWrapper}>
            <h1 className={styles.title}>Create your account</h1>
            <div className={styles.signupForm}>
                <input type="text" className={styles.input} placeholder="Email" onChange={(e)=> {setEmail(e.target.value)}}></input>
                <input type="password" className={styles.input} placeholder="Password" onChange={(e)=> {setPassword(e.target.value)}}></input>
                <input type="password" className={styles.input} placeholder="Confirm password" onChange={(e)=> {setSecondPassword(e.target.value)}}></input>
                <button className={styles.signupButton} onClick={() => {createAccount()}}>Signup</button>
                <Link href="/login">Return to login</Link>
            </div>
        </div>
        </>
    )
}