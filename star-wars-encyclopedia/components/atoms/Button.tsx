import React from "react";

type Props = {
  title: string;
  onClick: () => void;
};

export const Button: React.FC<Props> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 border-2 border-yellow/70 text-white/50 rounded-full 
            hover:bg-yellow-400 hover:text-yellow/70 hover:border-yellow-400 transition-colors duration-300 cursor-pointer"
    >
      {title}
    </button>
  );
};
