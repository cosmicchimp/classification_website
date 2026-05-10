"use client";

import styles from "@styles/scan.module.css";
import HeaderComponent from "../components/Header";
import { useState } from "react";

type Prediction = {
  result: string;
  confidence: number;
};

export default function Home() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const MAX_FILE_SIZE_MB = 5;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    setError("");
    setPrediction(null);

    if (!file) {
      setImageFile(null);
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      setImageFile(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`Image must be under ${MAX_FILE_SIZE_MB}MB.`);
      setImageFile(null);
      return;
    }

    setImageFile(file);
  }

  async function classifyImage(file: File): Promise<Prediction> {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("https://classification-python-api.onrender.com/classify", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      throw new Error(`Image classification failed. Status: ${res.status}`);
    }

    const data = await res.json();

    if (
      !data ||
      typeof data.result !== "string" ||
      typeof data.confidence !== "number"
    ) {
      throw new Error("Invalid classification response shape.");
    }

    return {
      result: data.result,
      confidence: data.confidence,
    };
  }

  async function saveScan(scanData: Prediction) {
    const userID = localStorage.getItem("userID");

    if (!userID) {
      throw new Error("No userID found in localStorage.");
    }

    const res = await fetch("/api/save-scan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        result: scanData.result,
        confidence: scanData.confidence,
        ID: Number(userID),
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to save scan. Status: ${res.status}`);
    }

    const saveResponse = await res.json();
    return saveResponse;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setPrediction(null);

    if (!imageFile) {
      setError("Please select an image first.");
      return;
    }

    try {
      setLoading(true);

      const classifiedData = await classifyImage(imageFile);

      setPrediction(classifiedData);

      const saveResponse = await saveScan(classifiedData);

      console.log("Scan saved successfully:", saveResponse);
    } catch (err) {
      console.error("Scan submission error:", err);

      setError("Something went wrong while analyzing or saving the image.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.homeWrapper}>
      <HeaderComponent />

      <main className={styles.uploadSection}>
        <form onSubmit={handleSubmit} className={styles.uploadCard}>
          <h2>Animal Classifier</h2>

          <p>
            Upload an animal photo. The model will return its best prediction
            and save the result to your scan history.
          </p>

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className={styles.fileInput}
          />

          {imageFile && (
            <p className={styles.fileName}>Selected: {imageFile.name}</p>
          )}

          {error && <p className={styles.errorText}>{error}</p>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Submit Image"}
          </button>

          {prediction && (
            <section className={styles.resultCard}>
              <h3>Classification Result</h3>

              <div className={styles.resultRow}>
                <span>Prediction</span>
                <strong>{prediction.result}</strong>
              </div>

              <div className={styles.resultRow}>
                <span>Confidence</span>
                <strong>{(prediction.confidence * 100).toFixed(2)}%</strong>
              </div>

              <div className={styles.confidenceBar}>
                <div
                  className={styles.confidenceFill}
                  style={{
                    width: `${prediction.confidence * 100}%`,
                  }}
                />
              </div>
            </section>
          )}
        </form>
      </main>
    </div>
  );
}