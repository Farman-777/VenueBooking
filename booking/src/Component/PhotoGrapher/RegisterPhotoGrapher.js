import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPhotoGrapher = () => {
  const navigate = useNavigate()
  const [PhotoGrapherName, setPhotoGrapherName] = useState('');
  const [PhotoGrapherLocation, setPhotoGrapherLocation] = useState('');
  const [PhotoGrapherPrice,setPhotoGrapherPrice] = useState(0)
  const [PhotoGrapherDescription, setPhotoGrapherDescription] = useState('');
  const [PhotoGrapherEmail, setPhotoGrapherEmail] = useState('');
  const [PhotoGrapherImages, setPhotoGrapherImages] = useState([]); // Use an array to store multiple images

  const handleImageChange = (e) => {
    // Use 'multiple' attribute to allow multiple file selection
    setPhotoGrapherImages(e.target.files);
  };

  const handlePhotoGrapherNameChange = (e) => {
    setPhotoGrapherName(e.target.value);
  };

  const handlePhotoGrapherLocationChange = (e) => {
    setPhotoGrapherLocation(e.target.value);
  };

  const handlePhotoGrapherDescriptionChange = (e) => {
    setPhotoGrapherDescription(e.target.value);
  };

  const handlePhotoGrapherPriceChange = (e) => {
    setPhotoGrapherPrice(e.target.value);
  };
  const handlePhotoGrapherEmailChange = (e) => {
    setPhotoGrapherEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('PhotoGrapherName', PhotoGrapherName);
    formData.append('PhotoGrapherLocation', PhotoGrapherLocation);
    formData.append('PhotoGrapherPrice', PhotoGrapherPrice);
    formData.append('PhotoGrapherDescription', PhotoGrapherDescription);    
    formData.append("PhotoGrapherEmail", PhotoGrapherEmail);
    formData.append("Status", "pending");
    formData.append("entityType", "Photographer");

    // Append each selected image to the formData
    for (let i = 0; i < PhotoGrapherImages.length; i++) {
      formData.append('images', PhotoGrapherImages[i]);
    }

    axios
      .post('http://localhost:8001/addPhotoData', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'PhotoGrapher Registered',
            text: 'Your PhotoGrapher has been successfully registered!',
          });

          // Clear the form fields and reset the PhotoGrapherImages
          setPhotoGrapherName('');
          setPhotoGrapherLocation('');
          setPhotoGrapherDescription('');
          setPhotoGrapherPrice(0);
          setPhotoGrapherImages([]);
          setPhotoGrapherEmail('');
        }
      }).then(() => navigate("/PhotoGrapherMain"))
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'PhotoGrapher With The Same Name Exist', // Display the error message from the response
        });
      });
  };


  return (
    <div className="container mt-2 p-4" 
    style={{
      boxShadow:"rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
      borderRadius:"16px"
      }}>
      <div className="card">
        <div className="card-header" style={{ backgroundColor: '#007bff', color: '#fff', textAlign: 'center' }}>
          <h1 className="mb-0">Register Your PhotoGrapher</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="PhotoGrapherName" className="form-label" style={{ fontWeight: 'bold' }}> PhotoGrapher Name: </label>
              <input type="text" className="form-control" id="PhotoGrapherName" value={PhotoGrapherName} onChange={handlePhotoGrapherNameChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="PhotoGrapherLocation" className="form-label" style={{ fontWeight: 'bold' }}> PhotoGrapher Location:</label>
              <input type="text" className="form-control" id="PhotoGrapherLocation" value={PhotoGrapherLocation} onChange={handlePhotoGrapherLocationChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="PhotoGrapherPrice" className="form-label" style={{ fontWeight: 'bold' }}> PhotoGrapher Price:</label>
              <input type="number" className="form-control" id="PhotoGrapherPrice" value={PhotoGrapherPrice} onChange={handlePhotoGrapherPriceChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="PhotoGrapherEmail" className="form-label" style={{ fontWeight: 'bold' }}> PhotoGrapher Email:</label>
              <input type="email" className="form-control" id="PhotoGrapherEmail" value={PhotoGrapherEmail} onChange={handlePhotoGrapherEmailChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="PhotoGrapherDescription" className="form-label" style={{ fontWeight: 'bold' }}>PhotoGrapher Description:</label>
              <textarea className="form-control" id="PhotoGrapherDescription" rows="4" value={PhotoGrapherDescription} onChange={handlePhotoGrapherDescriptionChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="PhotoGrapherImage" className="form-label" style={{ fontWeight: 'bold' }}>PhotoGrapher Image:</label>
              <input type="file" className="form-control" id="PhotoGrapherImage" accept="image/*" onChange={handleImageChange} multiple required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007bff', border: 'none' }}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  )
        }

export default RegisterPhotoGrapher;
