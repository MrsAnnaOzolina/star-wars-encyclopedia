import React from "react";
import Image from "next/legacy/image";

interface SearchFormProps {
  inputSearchTerm: string;
  setInputSearchTerm: (value: string) => void;
  handleSearch: (event: React.FormEvent<HTMLFormElement>) => void;
  handleClearSearch: () => void;
}

export const SearchForm: React.FC<SearchFormProps> = ({
  inputSearchTerm,
  setInputSearchTerm,
  handleSearch,
  handleClearSearch,
}) => {
  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <div className="w-full relative">
        <input
          type="text"
          value={inputSearchTerm}
          onChange={(e) => setInputSearchTerm(e.target.value)}
          placeholder="Search characters..."
          className="w-full pl-4 pr-16 py-2 rounded-full border border-blue-400 bg-black focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        />
        {inputSearchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-xl font-bold"
          >
            ×
          </button>
        )}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pt-1.5 hover:opacity-80 transition-opacity ">
          <Image src="/svg/lupa.svg" alt="Search" width={18} height={18} />
        </div>
      </div>
    </form>
  );
};
