import React from 'react';

interface SortButtonProps {
  sortOrder: "asc" | "desc" | null;
  handleSort: () => void;
  disabled: boolean;
}

export const SortButton: React.FC<SortButtonProps> = ({ sortOrder, handleSort, disabled }) => {
  return (
    <button
      onClick={handleSort}
      disabled={disabled}
      className="px-2 py-1 bg-green-500 text-white rounded mb-4"
    >
      {sortOrder === null
        ? "Sort by Name"
        : `Sort by Name ${sortOrder === "asc" ? "↑" : "↓"}`}
    </button>
  );
};