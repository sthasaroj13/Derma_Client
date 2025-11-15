import { X } from "lucide-react";
import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center  ">
      <div className="bg-slate-100 rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[75vh] overflow-y-auto p-6 relative">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white  cursor-pointer   bg-red-500 rounded-full"
        >
          <X />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
