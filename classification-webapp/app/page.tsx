import Image from "next/image";
import styles from "@styles/landingpage.module.css"
import HeaderComponent from "./components/Header";
export default function LandingPage() {
  return (
    <>
    <HeaderComponent isAuthenticated={false}/>
    <div className={styles.landingWrapper}>
        <h1 className={styles.title}>Welcome to AnimalScan!</h1>
        <p className={styles.description}>This is a website built in TypeScript and NextJS, hosted through AWS, and attached to a Python backend server that hosts the pre-trained CNN classification model.</p>  
        <br/>
        <p className={styles.description}>Please log in to get started!</p>    
    </div>
    </>
  );
}
