import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CaterCard from "./CaterCard";
import axios from "axios";

function MainComponentTwo() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const userData = async () => {
      try {
        const res = await axios.get("http://localhost:8002/getCaterData");
        setCardData(res.data);
        console.log(res.data);

      } catch (ex) {
        console.error(ex);
      }
    };
    userData();
  }, []);

  return (
    <div className="App">
      {cardData.length > 0 && (
        <div
          className="p-4 ms-4 me-4"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "20px",
            marginTop: "30px",
            borderRadius: "10px",
            overflow: "hidden",
            border: "1px solid #e0e0e0",
          }}
        >
          {cardData.map((user, i) => (
            <Link to={`/caterBookingB5/${user._id}`} style={{textDecoration:"none"}}><CaterCard key={i} user={user} /></Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainComponentTwo;
