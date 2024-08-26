"use client"; // Esto convierte todo el componente en un Client Component

import "./globals.css";
import Footer from "@/Components/layout/Footer";
import { Provider } from "react-redux";
import store from "../store/index";

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
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
