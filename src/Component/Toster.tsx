import React, { useEffect } from "react";

interface ToastProps {
  message: string;
  success: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, success, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-4 right-4 max-w-xs w-full p-4 rounded-lg shadow-lg transition-all duration-300 ${
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
