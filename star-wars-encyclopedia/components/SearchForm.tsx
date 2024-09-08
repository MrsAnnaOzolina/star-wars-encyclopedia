import React from 'react';

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
  handleClearSearch
}) => {
  return (
    <form onSubmit={handleSearch} className="mb-4 flex items-center">
    <div className="relative">
      <input
        type="text"
        value={inputSearchTerm}
        onChange={(e) => setInputSearchTerm(e.target.value)}
        placeholder="Search characters..."
        className="px-2 py-1 border rounded mr-2 pr-8 text-black"
      />
      {inputSearchTerm && (
        <button
          type="button"
          onClick={handleClearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      )}
    </div>
    <button
      type="submit"
      className="px-2 py-1 bg-blue-500 text-white rounded"
    >
      Search
    </button>
  </form>
  );
};
