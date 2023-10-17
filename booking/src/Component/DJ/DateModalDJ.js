
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DateModalDJ = ({ handleClose,id }) => {
  // const { id } = useParams();
  console.log("DJ_ID : ",id);
  const [filter, setFilter] = useState("");
  const [tableData, setTableData] = useState([]);
  

  useEffect(() => {
    const getTableRecord = () => {
      axios.get(`http://localhost:8003/getDJRecord/${id}`).then((response) => {
        console.log(response.data);
        setTableData(response.data);
      });
    };
    getTableRecord();
  }, [id]);
  console.log("tableData ",tableData);
  // Function to handle filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // // Filter the data based on the filter value
  const filteredData = tableData?.filter((item) => item.Date.includes(filter));


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
  {filteredData?.length === 0 ? (
    <p>Booking Available.</p>
  ) : (
      <table class="table table-hover" style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle} scope="col">Date</th>
            <th style={thStyle} scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((user) => (
            <tr>
              <td>{user.Date}</td>
              <td>{user.Status}</td>
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
          {filteredData?.length == 0 ? "Go For Booking" : "Close"}
        </button>
      </div>
    </>
  );
};

export default DateModalDJ;
