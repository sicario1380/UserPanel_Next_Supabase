"use client";

import React from "react";

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  label?: string;
  id?: string;
}

const TextArea: React.FC<TextAreaProps> = ({
  className,
  label,
  id,
  ...props
}) => {
  return (
    <div className={`textarea-container ${className}`}>
      {label && (
        <label htmlFor={id} className="textarea-label">
          {label}
        </label>
      )}{" "}
      <textarea id={id} className="textarea" {...props}></textarea>{" "}
    </div>
  );
};

export default TextArea;
