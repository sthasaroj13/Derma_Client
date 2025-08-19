import React, { useEffect, useRef } from "react";

interface ToastProps {
  message: string;
  success: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, success, isOpen, onClose }) => {
  const toastRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Auto-close after 3 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 2000);

      // Handle outside clicks
      const handleClickOutside = (event: MouseEvent) => {
        if (
          toastRef.current &&
          !toastRef.current.contains(event.target as Node)
        ) {
          onClose();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        clearTimeout(timer);
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={toastRef}
      className={`fixed top-1 right-1 max-w-xs w-full z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
        success ? "bg-green-500 text-white" : "bg-red-500 text-white"
      } animate-slide-in`}
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
