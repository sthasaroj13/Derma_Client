import React, { forwardRef } from "react";

interface InputProps {
  type: "email" | "password" | "radio" | "checkbox" | "text";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  value?: string;
  placeholder?: string;
  className?: string;
  name?: string;
}

const InputField = forwardRef<HTMLInputElement, InputProps>(
  ({ type, onChange, onClick, value, placeholder, className, name }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        onChange={onChange}
        onClick={onClick}
        value={value}
        placeholder={placeholder}
        className={`border border-gray-300 w-full text-[13px]   h-[30px] bg-white px-2 py-2 rounded-[.625rem]   focus:outline-none focus:ring-orange-500 focus:border-orange-500  placeholder:text-[12px] ${className}`}
        name={name}
      />
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
