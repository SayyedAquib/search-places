import React, { useState } from "react";
import "../App.css";

const SearchBox = ({ onSearch }) => {
  // State to manage the search input value
  const [searchTerm, setSearchTerm] = useState("");

  // Event handler for input change
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Event handler for key press, specifically handling "Enter" key
  const handleKeyPress = (e) => {
    // Trigger onSearch when "Enter" key is pressed
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  // Render an input element for search with event handlers
  return (
    <input
      type="text"
      placeholder="Search places..."
      value={searchTerm}
      onChange={handleInputChange}
      onKeyDown={handleKeyPress}
    />
  );
};

export default SearchBox;
