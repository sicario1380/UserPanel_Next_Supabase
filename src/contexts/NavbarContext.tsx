"use client";

import React, { createContext, useContext, useReducer, ReactNode } from "react";

// Define the shape of the Navbar context state
interface NavbarState {
  isExpanded: boolean;
  selectedItem: string;
  hoveredItem: string | null;
  error: string | null;
}

// Define the initial state
const initialState: NavbarState = {
  isExpanded: false,
  selectedItem: "داشبورد",
  hoveredItem: null,
  error: null,
};

// Define the actions
type NavbarAction =
  | { type: "TOGGLE_NAVBAR" }
  | { type: "SELECT_ITEM"; payload: string }
  | { type: "HOVER_ITEM"; payload: string }
  | { type: "RESET_HOVER_ITEM" }
  | { type: "SET_ERROR"; payload: string }
  | { type: "CLEAR_ERROR" };

// Create a reducer function to manage state transitions
const navbarReducer = (
  state: NavbarState,
  action: NavbarAction
): NavbarState => {
  switch (action.type) {
    case "TOGGLE_NAVBAR":
      return { ...state, isExpanded: !state.isExpanded };
    case "SELECT_ITEM":
      return { ...state, selectedItem: action.payload, error: null };
    case "HOVER_ITEM":
      return { ...state, hoveredItem: action.payload };
    case "RESET_HOVER_ITEM":
      return { ...state, hoveredItem: null };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

const NavbarContext = createContext<
  { state: NavbarState; dispatch: React.Dispatch<NavbarAction> } | undefined
>(undefined);

// Provider component
interface NavbarProviderProps {
  children: ReactNode;
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(navbarReducer, initialState);

  return (
    <NavbarContext.Provider value={{ state, dispatch }}>
      {children}
    </NavbarContext.Provider>
  );
};

// Custom hook to use the Navbar context
export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarContext must be used within a NavbarProvider");
  }
  return context;
};
