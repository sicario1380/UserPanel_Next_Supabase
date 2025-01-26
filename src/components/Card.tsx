"use client";
import React from "react";
import CustomImage from "./CustomImage";

interface CardProps {
  imageSrc: string;
  altText: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, altText }) => {
  return (
    <div className="my-4">
      <CustomImage
        src={imageSrc}
        alt={altText}
        className="w-full h-auto"
        width={30}
        height={30}
        priority={true}
      />
    </div>
  );
};

export default Card;
