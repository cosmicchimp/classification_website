import Image from "next/image";
import styles from "@styles/home.module.css"
import HeaderComponent from "./components/Header";
export default function Home() {
  return (
    <>
    <HeaderComponent/>
    <div className={styles.homeWrapper}>
        <h1 className={styles.title}>Welcome to AnimalScan!</h1>
        <p className={styles.description}>This is a website built in TypeScript and NextJS, hosted through AWS, and attached to a python backend server that hosts the pre-trained CNN classification model.</p>    
    </div>
    </>
  );
}
