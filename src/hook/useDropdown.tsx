import { useEffect, useRef, useState } from "react";

const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Function to update dropdown position
  const updateDropdownPosition = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      setDropdownStyle({
        top: `${rect.bottom + window.scrollY}px`,
        left: `${rect.left + window.scrollX}px`,
      });
    }
  };
  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Close dropdown

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      updateDropdownPosition();
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);
  const closeDropdown = () => setIsOpen(false);

  return {
    isOpen,
    setIsOpen,
    dropdownStyle,
    dropdownRef,
    closeDropdown,
    toggle,
  };
};

export default useDropdown;
