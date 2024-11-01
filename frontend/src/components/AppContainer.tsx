import React from "react";
import Header from "./Header";
import MiddleContainer from "./MiddleContainer";
import Footer from "./Footer";

// this is the outermost container for the app
export default function AppContainer() {
  return (
    <div className="w-full h-screen flex items-start flex-col">
      <Header />
      <MiddleContainer />
      <Footer />
    </div>
  );
}
