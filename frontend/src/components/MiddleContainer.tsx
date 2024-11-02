import React from "react";
import LoginContainer from "./LoginContainer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

// this is the Middle section
export default function MiddleContainer() {
  return (
    <div className="w-full p-5 flex justify-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginContainer />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
