"use client";

import styles from "@styles/profile.module.css";
import HeaderComponent from "../components/Header";
import { useState, useEffect } from "react";

type Scan = {
  scan_id: number;
  result: string;
  confidence: string;
  creator_id: string;
  date_created: string;
};

export default function Home() {
  const [scans, setScans] = useState<Scan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScans() {
      try {
        const scanRequest = await fetch("/api/fetch-scans", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ID: localStorage.getItem("userID"),
          }),
        });

        const scanResponse = await scanRequest.json();

        const sortedScans = [...(scanResponse.data.query ?? [])].sort(
          (a, b) =>
            new Date(b.date_created).getTime() -
            new Date(a.date_created).getTime()
        );

        setScans(sortedScans);
      } catch (error) {
        console.error("Failed to fetch scans:", error);
        setScans([]);
      } finally {
        setLoading(false);
      }
    }

    fetchScans();
  }, []);

  return (
    <div className={styles.homeWrapper}>
      <HeaderComponent />

      <main className={styles.profileContent}>
        <section className={styles.scanCard}>
          <div className={styles.scanHeader}>
            <div>
              <h2>Your Scans</h2>
              <p>Previous image classification results</p>
            </div>

            <span className={styles.scanCount}>{scans.length} total</span>
          </div>

          {loading ? (
            <p className={styles.statusText}>Loading scans...</p>
          ) : scans.length === 0 ? (
            <p className={styles.statusText}>No scans found.</p>
          ) : (
            <ul className={styles.scanList}>
{scans.map((scan) => {
  const confidencePercent = (Number(scan.confidence) * 100).toFixed(2);

  const rawDate = new Date(scan.date_created);

  const mountainAdjustedDate = new Date(
    rawDate.getTime() - 6 * 60 * 60 * 1000
  );

  const formattedDate = mountainAdjustedDate.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <li key={scan.scan_id} className={styles.scanItem}>
      <div className={styles.scanInfo}>
        <h3>{scan.result}</h3>
        <p>{formattedDate} MT</p>
      </div>

      <div className={styles.confidenceBadge}>
        {confidencePercent}%
      </div>
    </li>
  );
})}
            </ul>
          )}
        </section>
      </main>
    </div>
  );
}