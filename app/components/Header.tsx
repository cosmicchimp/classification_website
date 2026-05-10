"use client";

import Link from "next/link";
import styles from "@styles/header.module.css";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";

export default function HeaderComponent() {
  const { authenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    logout();
    closeMenu();
  }

  return (
    <header className={styles.headerWrapper}>
      <h1 className={styles.title}>
        <Link href="/" onClick={closeMenu}>
          AnimalScan
        </Link>
      </h1>

      <button
        className={styles.menuButton}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav
        className={`${styles.linkList} ${
          menuOpen ? styles.linkListOpen : ""
        }`}
      >
        <div className={styles.link}>
          <Link href="/" onClick={closeMenu}>
            Home
          </Link>
        </div>

        {!authenticated && (
          <div className={styles.link}>
            <Link href="/login" onClick={closeMenu}>
              Login
            </Link>
          </div>
        )}

        {authenticated && (
          <>
            <div className={styles.link}>
              <Link href="/scan" onClick={closeMenu}>
                Scan
              </Link>
            </div>

            <div className={styles.link}>
              <Link href="/profile" onClick={closeMenu}>
                Profile
              </Link>
            </div>

            <div className={styles.link}>
              <Link href="/login" onClick={handleLogout}>
                Logout
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}