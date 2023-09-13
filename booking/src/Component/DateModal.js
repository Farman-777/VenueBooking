import React, { useState } from "react";

const DateModal = ({ handleClose }) => {
    
  const [filter, setFilter] = useState("");
  const [dummyData] = useState([
    {
      status: "Booked",
      date: "20-09-23",
    },
    {
      status: "Booked",
      date: "27-09-23",
    },
    {
      status: "Booked",
      date: "04-10-23",
    },
    {
      status: "Booked",
      date: "11-10-23",
    },
    {
      status: "Booked",
      date: "18-10-23",
    },
    {
      status: "Booked",
      date: "25-10-23",
    },
    {
      status: "Booked",
      date: "01-11-23",
    },
  ]);

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // Filter the data based on the filter value
  const filteredData = dummyData.filter((item) => item.date.includes(filter));

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
  };

  const thStyle = {
    backgroundColor: "#333",
    color: "#fff",
  };

  const evenRowStyle = {
    backgroundColor: "#f2f2f2",
  };

  return (
    <>
      {/* <h1>Booking Data</h1> */}
      <div className="mb-3">
        <label htmlFor="filter" className="form-label">
          Filter by Date:
        </label>
        <input
          type="text"
          id="filter"
          className="form-control"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Enter date in this format dd-mm-yy"
        />
      </div>
      {filteredData.length === 0 ? (
        <p>Booking Available.</p>
      ) : (
        <table style={tableStyle} className="table table-hover">
          <thead>
            <tr>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} style={index % 2 === 0 ? evenRowStyle : {}}>
                <td>{item.date}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="text-end">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleClose}
        >
          {filteredData.length == 0 ? "Go For Booking" : "Close"}
        </button>
      </div>
    </>
  );
};

export default DateModal;
