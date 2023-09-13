import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import VenueCard from "./VenueCard";
import axios from "axios";

function MainComponent() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    const userData = async () => {
      try {
        const res = await axios.get("http://localhost:8000/getData");
        // Assuming res.data is an array, you can directly set it to cardData
        setCardData(res.data.map((doc) => ({ ...doc, id: doc.id })));
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
            <Link to={`/VenueBook/${user._id}`}><VenueCard key={i} user={user} /></Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainComponent;
