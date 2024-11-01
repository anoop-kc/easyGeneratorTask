import React from "react";

// this is the Footer section
export default function Footer() {
  return (
    <div className="w-full py-5 flex justify-center  absolute bottom-0">
      All rights reserved. &copy; Easygenerator {new Date().getFullYear()}
    </div>
  );
}
