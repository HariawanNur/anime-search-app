import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Cari anime..."}
      className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      autoFocus
    />
  );
};

export default SearchBar;
