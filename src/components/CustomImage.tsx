"use client";

import React from "react";
import Image from "next/image";

interface CustomImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

const CustomImage: React.FC<CustomImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  ...props
}) => {
  return (
    <div style={{ width: width, height: height }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ width: "auto", height: "auto" }}
        {...props}
        className={`h-6 w-6 ${props.className}`}
        priority={priority}
      />
    </div>
  );
};

export default CustomImage;
