"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const Input: React.FC<InputProps> = ({ className, label, ...props }) => {
  return (
    <React.Fragment>
      {label && <label>{label}</label>} {/* Render the label if provided */}
      <input className={`${className} input`} {...props} />
    </React.Fragment>
  );
};

export default Input;
