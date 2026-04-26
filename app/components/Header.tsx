'use client'
import Link from "next/link"
import styles from "@styles/header.module.css"
import { useState, useEffect } from "react"
import { useAuth } from "../auth/AuthProvider"
export default function HeaderComponent() {
    const {authenticated, loggedInUser, logout} = useAuth()
    return (
        <div className={styles.headerWrapper}>
            <h1 className={styles.title}><Link href={"/"}>AnimalScan</Link></h1>
            {!authenticated && 
            <div className={styles.linkList}>
                <div className={styles.link}><Link href={"/"}>Home</Link></div>
                <div className={styles.link}><Link href={"/login"}>Login</Link></div>
            </div>
            }
            {/* Authenticated header links */}
            {authenticated && 
            <div className={styles.linkList}>
                <div className={styles.link}><Link href={"/"}>Home</Link></div>
                <div className={styles.link}><Link href={"/scan"}>Scan</Link></div>
                <div className={styles.link}><Link href={"/profile"}>Profile</Link></div>
                <div onClick={() => {logout()}} className={styles.link}><Link href={"/login"}>Logout</Link></div>
            </div>
            }
        </div>
    )
}
