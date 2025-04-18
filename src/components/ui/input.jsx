import React from "react";

function Input({ type, placeholder, className, ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border p-2 rounded-lg w-full ${className}`}
      {...props}
    />
  );
}

export default Input;
