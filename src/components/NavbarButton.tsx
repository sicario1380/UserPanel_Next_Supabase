"use client";

import React, { memo, useCallback } from "react";
import { useNavbarContext } from "../contexts/NavbarContext";
import CustomImage from "./CustomImage";
import Button from "./Button";
import "../styles/Navbar.css";

interface NavbarButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  iconPath: string;
  onClick?: () => void; // Optional click handler
}

const NavbarButton: React.FC<NavbarButtonProps> = ({
  label,
  iconPath,
  onClick,
  className,
  ...props
}) => {
  const { state, dispatch } = useNavbarContext();
  const { hoveredItem, selectedItem } = state;

  // Determine class based on hover and selection
  const stateClass = `
    navbar-item 
    ${hoveredItem === label ? "hovered" : ""} 
    ${selectedItem === label ? "selected" : ""}
  `.trim();

  const handleSelectCallback = useCallback(() => {
    dispatch({ type: "SELECT_ITEM", payload: label });
    if (onClick) {
      onClick(); // Call the passed onClick function if it exists
    }
  }, [dispatch, label, onClick]);

  const handleHoverCallback = useCallback(() => {
    dispatch({ type: "HOVER_ITEM", payload: label });
  }, [dispatch, label]);

  const handleMouseLeaveCallback = useCallback(() => {
    dispatch({ type: "RESET_HOVER_ITEM" });
  }, [dispatch]);

  return (
    <Button
      className={`${stateClass} ${className}`}
      onClick={handleSelectCallback}
      onMouseEnter={handleHoverCallback}
      onMouseLeave={handleMouseLeaveCallback}
      {...props}
    >
      <CustomImage
        src={iconPath}
        alt={label}
        width={30}
        height={30}
        priority={true}
      />
      {state.error && (
        <div className="text-red-500 absolute top-0">{state.error}</div>
      )}
    </Button>
  );
};

export default memo(NavbarButton);

