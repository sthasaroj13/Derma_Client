import React from "react";
import Modal from "./GlobalModal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Login Required">
      <p className="text-gray-700 mb-6  ">
        You must log in to use this feature.
      </p>
      <div className="flex justify-center gap-4 ">
        <button
          onClick={onLogin}
          className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition cursor-pointer"
        >
          Go to Login
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default AuthModal;
