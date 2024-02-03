import React from "react";
import "../App.css";

const Table = ({ data }) => {
  // If no data or empty data array, display a message
  if (!data || data.length === 0) {
    return <p>No result found</p>;
  }

  // Render a table with header and body
  return (
    <table>
      {/* Table header */}
      <thead>
        <tr>
          <th>#</th>
          <th>Place Name</th>
          <th>Country</th>
        </tr>
      </thead>

      {/* Table body */}
      <tbody>
        {/* Map through the data and render each row */}
        {data?.map((item, index) => (
          <tr key={item?.id}>
            <td>{index + 1}</td>
            <td>{item?.name}</td>
            <td>
              {/* Display country flag and name */}
              <img
                src={`https://flagsapi.com/${item?.countryCode}/flat/64.png`}
                alt={item?.country}
              />
              {item?.country}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
