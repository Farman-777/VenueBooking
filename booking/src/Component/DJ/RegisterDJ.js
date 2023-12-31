import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterDJ = () => {
  const navigate = useNavigate();
  const [DJName, setDJName] = useState("");
  const [DJLocation, setDJLocation] = useState("");
  const [DJPrice, setDJPrice] = useState(0);
  const [DJEmail, setDJEmail] = useState("");
  const [DJDescription, setDJDescription] = useState("");
  const [DJImages, setDJImages] = useState([]); // Use an array to store multiple images

  const handleImageChange = (e) => {
    // Use 'multiple' attribute to allow multiple file selection
    setDJImages(e.target.files);
  };

  const handleDJNameChange = (e) => {
    setDJName(e.target.value);
  };

  const handleDJLocationChange = (e) => {
    setDJLocation(e.target.value);
  };

  const handleDJDescriptionChange = (e) => {
    setDJDescription(e.target.value);
  };

  const handleDJPriceChange = (e) => {
    setDJPrice(e.target.value);
  };

  const handleDJEmailChange = (e) => {
    setDJEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("DJName", DJName);
    formData.append("DJLocation", DJLocation);
    formData.append("DJPrice", DJPrice);
    formData.append("DJDescription", DJDescription);
    formData.append("DJEmail", DJEmail);
    formData.append("Status", "pending");
    formData.append("entityType", "DJ");

    // Append each selected image to the formData
    for (let i = 0; i < DJImages.length; i++) {
      formData.append("images", DJImages[i]);
    }

    console.log(formData);

    axios
      .post("http://localhost:8003/addDJData", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.status === 200) {
          // Request was successful
          Swal.fire({
            icon: "success",
            title: "DJ Registered Request Sent To Admin",
            text: "Check After Some Time",
          });

          // Clear the form fields and reset the DJImages
          setDJName("");
          setDJLocation("");
          setDJPrice(null);
          setDJDescription("");
          setDJImages([]);
        }
      })
      .then(() => navigate("/DJMain"))
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "DJ With The Same Name Exist", // Display the error message from the response
        });
      });
  };
  return (
    <div
      className="container mt-2 p-4"
      style={{
        boxShadow:
          "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
        borderRadius: "16px",
      }}
    >
      <div className="card">
        <div
          className="card-header"
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h1 className="mb-0">Register Your DJ</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="DJName" className="form-label" style={{ fontWeight: "bold" }} >DJ Name: </label>
              <input type="text" className="form-control" id="DJName" value={DJName} onChange={handleDJNameChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="DJLocation" className="form-label" style={{ fontWeight: "bold" }} > DJ Location: </label>
              <input type="text" className="form-control" id="DJLocation" value={DJLocation} onChange={handleDJLocationChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="DJPrice" className="form-label" style={{ fontWeight: "bold" }} > DJ Price: </label>
              <input  type="number" className="form-control" id="DJPrice" value={DJPrice} onChange={handleDJPriceChange} required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="DJEmail" className="form-label" style={{ fontWeight: "bold" }} > Email </label>
              <input type="email" className="form-control" id="DJEmail" value={DJEmail} onChange={handleDJEmailChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="DJDescription" className="form-label" style={{ fontWeight: "bold" }} > DJ Description: </label>
              <textarea className="form-control" id="DJDescription" rows="4" value={DJDescription} onChange={handleDJDescriptionChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="DJImage" className="form-label" style={{ fontWeight: "bold" }} > DJ Image: </label>
              <input type="file" className="form-control" id="DJImage" accept="image/*" onChange={handleImageChange} multiple required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#007bff", border: "none" }} > Submit </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterDJ;
