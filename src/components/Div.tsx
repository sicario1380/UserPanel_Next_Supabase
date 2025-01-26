"use client";

import React from "react";

interface DivProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  className?: string;
}

const Div: React.FC<DivProps> = ({
  children,
  id = "",
  className,
  ...props
}) => {
  return (
    <div id={id} className={className} {...props}>
      {children}
    </div>
  );
};

export default Div;
