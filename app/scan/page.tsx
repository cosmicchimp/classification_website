'use client'

import styles from "@styles/scan.module.css"
import HeaderComponent from "../components/Header"
import { useState } from "react"

export default function Home() {
  const [imageFile, setImageFile] = useState(null)
  const [prediction, setPrediction] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const MAX_FILE_SIZE_MB = 5
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"]

  function handleImageChange(e) {
    const file = e.target.files[0]
    setError("")
    setPrediction(null)

    if (!file) return

    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.")
      setImageFile(null)
      return
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`Image must be under ${MAX_FILE_SIZE_MB}MB.`)
      setImageFile(null)
      return
    }

    setImageFile(file)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setPrediction(null)

    if (!imageFile) {
      setError("Please select an image first.")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("image", imageFile)

      const res = await fetch("http://localhost:8000/classify", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        throw new Error("Image classification failed.")
      }
      const data = await res.json()
      
      setPrediction(data)
    } catch (err) {
      setError("Something went wrong while analyzing the image.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.homeWrapper}>
      <HeaderComponent />

      <main className={styles.uploadSection}>
        <form onSubmit={handleSubmit} className={styles.uploadCard}>
          <h2>Animal Classifier</h2>
          <p>Upload an animal photo (only JPEG, JPG, PNG) and the model will return its best prediction.</p>

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

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? "Analyzing..." : "Submit Image"}
          </button>

          {prediction && (
            <section className={styles.resultCard}>
              <h3>Classification Result</h3>

              <div className={styles.resultRow}>
                <span>Prediction</span>
                <strong>{prediction.label}</strong>
              </div>

              <div className={styles.resultRow}>
                <span>Confidence</span>
                <strong>{(prediction.confidence * 100).toFixed(2)}%</strong>
              </div>

              <div className={styles.confidenceBar}>
                <div
                  className={styles.confidenceFill}
                  style={{ width: `${prediction.confidence * 100}%` }}
                />
              </div>
            </section>
          )}
        </form>
      </main>
    </div>
  )
}