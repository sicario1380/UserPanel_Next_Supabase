"use client";

import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import NavbarButton from "./NavbarButton";
import CustomImage from "./CustomImage";
import Container from "./Container";
import Button from "./Button";
import Seperator from "./Seperator";
import Text from "./Text";
import Dropdown from "./support/Dropdown";
import { useNavbarContext } from "@/contexts/NavbarContext";
import "@/styles/globals.css";
import { useRouter, usePathname } from "next/navigation"; // Latest!
import { useNavbarState } from "@/hooks/useNavbarState";

const useClickOutside = (
  ref: React.RefObject<HTMLDivElement | null>,
  handler: (event: MouseEvent) => void
) => {
  const listener = useCallback(
    (event: MouseEvent) => {
      const current = ref.current;
      if (!current || current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    },
    [ref, handler]
  );

  useEffect(() => {
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [listener]);
};

const Navbar: React.FC = () => {
  const { state, dispatch } = useNavbarContext();
  const { isExpanded } = state;
  const router = useRouter(); // Use the new hook from next/navigation
  const pathname = usePathname(); // Get the current pathname
  const { handleSelect } = useNavbarState();
  const [isClient, setIsClient] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const items = useMemo(
    () => [
      {
        label: "Dashboard",
        iconPath: "/navbaricons/dashboard.svg",
        link: "/dashboard",
      }, // Update link
      {
        label: "My Courses",
        iconPath: "/navbaricons/courses.svg",
        link: "/courses",
      },
      {
        label: "Certificates",
        iconPath: "/navbaricons/certifs.svg",
        link: "/certificates",
      },
      {
        label: "Favorites",
        iconPath: "/navbaricons/fave.svg",
        link: "/favorites",
      },
      {
        label: "Support",
        iconPath: "/navbaricons/support.svg",
        isSupport: true,
        link: "/support",
      },
    ],
    []
  );

  const handleToggleCallback = () => {
    dispatch({ type: "TOGGLE_NAVBAR" });
  };

  const handleSupportClick = () => {
    setDropdownVisible((prev) => !prev);
  };

  useClickOutside(dropdownRef, () => setDropdownVisible(false));

  const handleItemClick = useCallback(
    (link: string, label: string) => {
      if (isClient && pathname !== link) {
        // Check if navigation is necessary
        router.push(link);
        handleSelect(label); // Select the item on click
      }
    },
    [router, isClient, pathname]
  );

  return (
    <Container className={`navbar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="logos">
        <div className="logo">
          <CustomImage
            src="/frameicons/logo.svg"
            alt="Logo"
            width={30}
            height={30}
            priority
          />
        </div>
        <Button onClick={handleToggleCallback} className="menu">
          <CustomImage
            src="/frameicons/menu.svg"
            alt="Menu"
            width={30}
            height={30}
            priority={true}
          />
        </Button>
      </div>
      {items.map((item) => (
        <React.Fragment key={item.label}>
          {" "}
          {/* Use label as key */}
          <Container className="navbar-item">
            <NavbarButton
              label={item.label}
              iconPath={item.iconPath}
              onClick={
                item.isSupport
                  ? handleSupportClick
                  : () => handleItemClick(item.link, item.label)
              }
            />
            {isExpanded && <Text className="text-white">{item.label}</Text>}
            {/* Conditionally render dropdown ONLY for "Support" item */}
            {item.isSupport && isDropdownVisible && (
              <div ref={dropdownRef}>
                <Dropdown
                  isVisible={isDropdownVisible}
                  onClose={() => setDropdownVisible(false)}
                />
              </div>
            )}
          </Container>
          {/* Conditionally render separator */}
          {items.indexOf(item) < items.length - 1 && <Seperator />}
        </React.Fragment>
      ))}
    </Container>
  );
};

export default Navbar;
