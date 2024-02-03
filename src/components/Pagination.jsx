import React from "react";
import "../App.css";

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
  // Calculate the total number of pages needed based on totalItems and itemsPerPage
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Math.ceil - Returns the smallest integer greater than or equal to its numeric argument

  // If there is only one page or less, do not render the pagination component
  if (totalPages < 2) {
    return null;
  }

  // If there are multiple pages, render the pagination buttons
  return (
    <div>
      {/* Creates an array from an iterable object. */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button key={index + 1} onClick={() => onPageChange(index + 1)}>
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
