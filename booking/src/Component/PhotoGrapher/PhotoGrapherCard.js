import React, { useState } from "react";

const PhotoGrapherCard = ({ user }) => {
  const [showDateModal, setShowDateModal] = useState(false);

  return (
    <div
      className="card"
      style={{
        width: "18rem",
        boxShadow: "1px 1px 12px -5px black",
        border: "1px solid #e0e0e0",
      }}
    >
      <img
        src={`http://localhost:8001/Images/${user.images[0]}`}
        className="card-img-top img-fluid"
        alt="Venue"
        style={{
          height: "200px",
          objectFit: "cover",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      />
      <div className="card-body">
        <h5
          className="card-title"
          style={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            marginBottom: "10px",
            color: "#333",
          }}
        >
          {user.PhotoGrapherName}
        </h5>
        <p
          className="card-text"
          style={{ color: "#555", marginBottom: "15px" }}
        >
          Location: {user.PhotoGrapherLocation}
        </p>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => setShowDateModal(true)}
        >
          View More
        </button>
      </div>
    </div>
  );
};

export default PhotoGrapherCard;
