import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import {
  selectItem,
  hoverItem,
  resetHoverItem,
  toggleNavbar,
  setError,
  clearError,
} from "@/store/navbarSlice";
import { useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";

export const useNavbarState = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isExpanded, selectedItem, hoveredItem, error } = useSelector(
    (state: RootState) => state.navbar
  );
  const pathname = usePathname();

  // Wrap handleSelect in useCallback
  const handleSelect = useCallback(
    (label: string | null) => {
      try {
        dispatch(selectItem(label));
        dispatch(clearError());
      } catch (err) {
        console.error(err);
        dispatch(setError("Failed to select item"));
      }
    },
    [dispatch]
  ); // Add dispatch as a dependency

  const handleHover = (label: string | null) => {
    dispatch(hoverItem(label));
  };

  const handleMouseLeave = () => {
    dispatch(resetHoverItem());
  };

  const handleToggle = () => {
    dispatch(toggleNavbar());
  };

  useEffect(() => {
    if (pathname === "/dashboard") {
      handleSelect("Dashboard");
    } else if (pathname.startsWith("/support")) {
      handleSelect("Support"); // Select "Support" for any sub-route
    } else if (pathname === "/courses") {
      handleSelect("My Courses");
    } else if (pathname === "/certificates") {
      handleSelect("Certificates");
    } else if (pathname === "/favorites") {
      handleSelect("Favorites");
    } else {
      handleSelect(null);
    }
  }, [pathname, handleSelect]); // Now handleSelect is stable

  return {
    isExpanded,
    selectedItem,
    hoveredItem,
    error,
    handleSelect,
    handleHover,
    handleMouseLeave,
    handleToggle,
  };
};
