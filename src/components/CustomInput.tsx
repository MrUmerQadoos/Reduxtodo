"use client";

import { IoArrowForward } from "react-icons/io5";
import { ChangeEventHandler, KeyboardEventHandler } from "react";
import { motion } from "framer-motion";

interface CustomInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  onEnter: () => void;
  checked: boolean;
  onCheckboxChange: () => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  value,
  onChange,
  placeholder,
  onEnter,
  checked,
  onCheckboxChange,
}) => {
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <div className="p-2 relative flex items-center rounded-lg lg:w-[540px] border md:w-[380px] h-[67px] bg-white dark:bg-[#25273d] dark:border-border-dark">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="w-full h-full bg-transparent outline-none text-black placeholder-[#757c8d] dark:text-white dark:placeholder-gray-500 pl-4 rounded-md transition-colors duration-300"
      />

      <motion.div
        onClick={onEnter}
        className="text-lg mr-4 text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <IoArrowForward />
      </motion.div>
    </div>
  );
};

export default CustomInput;
