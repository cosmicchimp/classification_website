'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import HeaderComponent from "../components/Header"
import Link from "next/link"
import styles from "@styles/login.module.css"
import { useAuth } from "../auth/AuthProvider"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login } = useAuth()
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    try {
      setLoading(true)

      const res = await fetch("/api/login-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const loginInfo = await res.json()

      if (!res.ok || !loginInfo.success) {
        setError(loginInfo.message || "Invalid email or password.")
        return
      }
      login(email, loginInfo.userID)
      router.replace("/scan")
    } catch (e) {
      console.error("Login error:", e)
      setError("An error occurred while logging in. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <HeaderComponent />

      <main className={styles.loginWrapper}>
        <section className={styles.loginCard}>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Log in to continue to your account.</p>

          <form className={styles.loginForm} onSubmit={handleLogin}>
            <label className={styles.label}>
              Email
              <input
                type="email"
                className={styles.input}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className={styles.label}>
              Password
              <input
                type="password"
                className={styles.input}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            {error && <p className={styles.errorText}>{error}</p>}

            <button className={styles.loginButton} type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className={styles.signupText}>
            Don&apos;t have an account? <Link href="/signup">Sign up</Link>
          </p>
        </section>
      </main>
    </>
  )
} 