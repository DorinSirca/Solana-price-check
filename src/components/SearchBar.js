import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-container glass">
      <div className="search-input-container">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search tokens by name, symbol, or address..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="clear-button"
            aria-label="Clear search"
          >
            <X className="clear-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
