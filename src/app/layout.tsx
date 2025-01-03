"use client"; 

import "./globals.css";
import Footer from "../Components/layout/Footer";
import { Provider } from "react-redux";
import { store } from "@/store/store";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Provider store={store}>
          {children}
         <Footer className="flex-shrink-0"/> 
        </Provider>
      </body>
    </html>
  );
}
