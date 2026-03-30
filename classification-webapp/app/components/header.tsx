'use client'
import Link from "next/link"
import styles from "@styles/header.module.css"
import { useState, useEffect } from "react"
export default function HeaderComponent(props:{isAuthenticated:boolean}) {

    return (
        <div className={styles.headerWrapper}>
            <h1 className={styles.title}><Link href={"/"}>AnimalScan</Link></h1>
            {!props.isAuthenticated && 
            <div className={styles.linkList}>
                <div className={styles.link}><Link href={"/"}>Home</Link></div>
                <div className={styles.link}><Link href={"/login"}>Login</Link></div>
            </div>
            }
            {/* Authenticated header links */}
            {props.isAuthenticated && 
            <div className={styles.linkList}>
                <div className={styles.link}><Link href={"/"}>Home</Link></div>
                <div className={styles.link}><Link href={"/login"}>Profile</Link></div>
            </div>
            }
        </div>
    )
}