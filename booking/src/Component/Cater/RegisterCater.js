import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterCater = () => {
  const navigate = useNavigate();
  const [CaterName, setCaterName] = useState('');
  const [CaterLocation, setCaterLocation] = useState('');
  const [CaterPrice, setCaterPrice] = useState(0);
  const [CaterDescription, setCaterDescription] = useState('');
  const [CaterImages, setCaterImages] = useState([]); // Use an array to store multiple images

  const handleImageChange = (e) => {setCaterImages(e.target.files);};
  const handleCaterNameChange = (e) => {setCaterName(e.target.value);};
  const handleCaterLocationChange = (e) => {setCaterLocation(e.target.value);};
  const handleCaterDescriptionChange = (e) => {setCaterDescription(e.target.value);};
  const handleCaterPriceChange = (e) => {setCaterPrice(e.target.value);};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('CaterName', CaterName);
    formData.append('CaterLocation', CaterLocation);
    formData.append('CaterPrice', CaterPrice);
    formData.append('CaterDescription', CaterDescription);

    // Append each selected image to the formData
    for (let i = 0; i < CaterImages.length; i++) {
      formData.append('images', CaterImages[i]);
    }

    axios
      .post('http://localhost:8002/addCaterData', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Cater Registered',
            text: 'Your Cater has been successfully registered!',
          });

          // Clear the form fields and reset the CaterImages
          setCaterName('');
          setCaterLocation('');
          setCaterPrice(0);
          setCaterDescription('');
          setCaterImages([]);
        }
      }).then(() => navigate("/CaterMain"))
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Cater With The Same Name Exist', // Display the error message from the response
        });
      });
  };


  return (
    <div className="container mt-2 p-4 " 
    style={{
      boxShadow:"rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
      borderRadius:"16px"
      }}>
      <div className="card">
        <div className="card-header" style={{ backgroundColor: '#007bff', color: '#fff', textAlign: 'center' }}>
          <h1 className="mb-0">Register Your Cater</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="CaterName" className="form-label" style={{ fontWeight: 'bold' }}> Cater Name: </label>
              <input type="text" className="form-control" id="CaterName" value={CaterName} onChange={handleCaterNameChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="CaterLocation" className="form-label" style={{ fontWeight: 'bold' }}> Cater Location:</label>
              <input type="text" className="form-control" id="CaterLocation" value={CaterLocation} onChange={handleCaterLocationChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="DJPrice" className="form-label" style={{ fontWeight: 'bold' }}> Cater Price:</label>
              <input type="number" className="form-control" id="DJPrice" value={CaterPrice} onChange={handleCaterPriceChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="CaterDescription" className="form-label" style={{ fontWeight: 'bold' }}>
                Cater Description:
              </label>
              <textarea className="form-control" id="CaterDescription" rows="4" value={CaterDescription} onChange={handleCaterDescriptionChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="CaterImage" className="form-label" style={{ fontWeight: 'bold' }}>Cater Image:</label>
              <input type="file" className="form-control" id="CaterImage" accept="image/*" onChange={handleImageChange} multiple required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007bff', border: 'none' }}>Register Cater</button>
          </form>
        </div>
      </div>
{/* <div className='ms-3 p-4' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px', marginTop: "30px", borderRadius: "10px", overflow: 'hidden', border: '1px solid #e0e0e0' }}>
      {cardData.map((user) => (
        <CaterCard key={user._id} user={user} />
      ))}
    </div> */}
    </div>
  )
        }

export default RegisterCater;
