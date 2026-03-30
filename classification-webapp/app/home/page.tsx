'use client'
import styles from "@styles/home.module.css"
import HeaderComponent from "../components/Header"
import { useState } from "react"
export default function Home() {
    const [authenticated, setAuthenticated] = useState(true)
    return (
        <div className={styles.homeWrapper}>
            <HeaderComponent isAuthenticated={authenticated}/>
        </div>
    )
}