"use client";
import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, className, ...props }) => {
  return (
    <span className={className} {...props}>
      {children}
    </span>
  );
};

export default Text;
