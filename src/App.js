import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import "./App.css";

const App = () => {
  // State variables
  const [searchTerm, setSearchTerm] = useState(""); // Stores the search term entered by the user.
  const [searchResults, setSearchResults] = useState([]); // Holds the data fetched from the API based on the search term.
  const [loading, setLoading] = useState(false); // Indicates whether data is being fetched or not.
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page number for pagination.
  const [itemsPerPage, setItemsPerPage] = useState(5); // Represents the number of items to be displayed per page.
  
  // Function to fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://wft-geo-db.p.rapidapi.com/v1/geo/cities`,
        {
          params: {
            countryIds: "IN",
            namePrefix: searchTerm,
            limit: itemsPerPage,
          },
          headers: {
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_API_KEY,
          },
        }
      );
      setSearchResults(response?.data?.data);
      console.log(response?.data?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect hook to trigger data fetching when searchTerm, currentPage, or itemsPerPage changes
  useEffect(() => {
    fetchData();
  }, [searchTerm, currentPage, itemsPerPage]);

  // Function to handle search term input
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Function to handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Render the components
  return (
    <div>
      {/* SearchBox component for user input */}
      <SearchBox onSearch={handleSearch} />

      {/* Display loading message while fetching data */}
      {loading && <p className="loader"></p>}

      {/* Display table and pagination if search results are available */}
      {!loading && searchResults.length > 0 && (
        <>
          <Table data={searchResults} />
          <Pagination
            totalItems={searchResults.length}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Display message if no search results are found */}
      {!loading && searchResults.length === 0 && <p>No result found</p>}

      {/* Input for user to set the number of items per page */}
      <input
        type="number"
        min="1"
        max="10"
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(parseInt(e.target.value, 10))}
      />
    </div>
  );
};

export default App;
