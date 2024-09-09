import React from "react";

interface UnifiedButtonProps {
  title?: string;
  onClick: () => void;
  disabled?: boolean;
  sortOrder?: "asc" | "desc" | null;
  isSortButton?: boolean;
  className?: string;
}

export const Button: React.FC<UnifiedButtonProps> = ({
  title,
  onClick,
  disabled = false,
  sortOrder = null,
  isSortButton = false,
  className = "auto",
}) => {
  const getButtonText = () => {
    if (isSortButton) {
      return sortOrder === null
        ? "Sort by Name"
        : `Sort by Name ${sortOrder === "asc" ? "↓" : "↑"}`;
    }
    return title || "";
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-base px-3 sm:px-6 py-2 border-2 border-yellow/70 rounded-full hover:bg-yellow-400 hover:text-yellow hover:border-yellow transition-colors duration-300 cursor-pointer ${className}`}
    >
      {getButtonText()}
    </button>
  );
};
