import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Application from "./Application/Application";
import "../styles/globals.css";

interface topChildren {
  children: any;
}

export default function Layout({ children }: topChildren) {
  return (
    <div>
      <div style={{ boxShadow: " 0px 6px 20px 0px rgba(26, 21, 21, 0.08)" }}>
        <Header />
      </div>
      <div className="container mx-auto   p-5">
        {children}
        <Application />
      </div>
      <div className="bg-mainColor">
        <Footer />
      </div>
    </div>
  );
}
