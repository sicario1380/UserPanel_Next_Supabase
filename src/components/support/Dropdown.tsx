"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Div from "../Div";

interface DropdownProps {
  isVisible: boolean;
  onClose: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ isVisible, onClose }) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
    onClose();
  };

  if (!isVisible) return null;

  return (
    <Div className="dropdown">
      <div
        className="dropdown-item"
        onClick={() => handleNavigation("/support/create")}
      >
        Create
      </div>
      <div
        className="dropdown-item"
        onClick={() => handleNavigation("/support/history")}
      >
        History
      </div>
    </Div>
  );
};

export default Dropdown;
