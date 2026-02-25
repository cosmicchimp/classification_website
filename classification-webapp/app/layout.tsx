import type { Metadata } from "next";
import { Bitcount_Grid_Double} from "next/font/google";
import "./globals.css";

const bitcount = Bitcount_Grid_Double({
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "AnimalScan | AI Animal Classifier",
  description: "A web application built in Next.js that is attached to a FastAPI Python backend. This website allows you to upload photos and feed them to a ML Convolutional Neural Network; Which then determines whether or not is it a dog, cat, or neither, and then returns that result to the user alongside a confidence metric.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bitcount.className}`}>
        {children}
      </body>
    </html>
  );
}
