import React, { useState } from "react";
import { iErrorObject } from "../interfaces";

interface ErrorMessagesProps {
  errors: iErrorObject[];
}

export default function ErrorMessages({ errors }: ErrorMessagesProps) {
  return (
    <>
      {errors.map((error: iErrorObject) => (
        <div
          key={error.errorMessage}
          className="w-full my-2 p-1 flex text-red-500 text-sm "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Outline"
            viewBox="0 0 24 24"
            className="h-auto w-3 mr-1 fill-red-500"
          >
            <path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z" />
            <path d="M12,5a1,1,0,0,0-1,1v8a1,1,0,0,0,2,0V6A1,1,0,0,0,12,5Z" />
            <rect x="11" y="17" width="2" height="2" rx="1" />
          </svg>

          <span>{error.errorMessage}</span>
        </div>
      ))}
    </>
  );
}
