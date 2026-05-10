"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import HeaderComponent from "../components/Header";
import Link from "next/link";
import styles from "@styles/signup.module.css";

export default function Signup() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 8-12 chars, at least one number, at least one symbol
  const passwordRegex = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{8,12}$/;

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  async function createAccount() {
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("Password must be 8-12 characters and include at least one number and one symbol.");
      return;
    }

    if (password !== secondPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Account creation failed.");
      }

      alert("Account created successfully");
      router.push("/login");
    } catch (error) {
      alert("An error occurred during account creation. Please try again later.");
      console.log(error);
    }
  }

  return (
    <>
      <HeaderComponent />

      <div className={styles.signupWrapper}>
        <h1 className={styles.title}>Create your account</h1>

        <div className={styles.signupForm}>
          <input
            type="text"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className={styles.input}
            placeholder="Confirm password"
            value={secondPassword}
            onChange={(e) => setSecondPassword(e.target.value)}
          />

          <p className={styles.passwordRequirement}>
            Password must be 8-12 characters and include at least one number and one symbol.
          </p>

          <button className={styles.signupButton} onClick={createAccount}>
            Signup
          </button>

          <Link href="/login">Return to login</Link>
        </div>
      </div>
    </>
  );
}