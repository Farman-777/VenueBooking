import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterVenue = () => {
  const navigate = useNavigate();
  const [venueName, setVenueName] = useState('');
  const [venueLocation, setVenueLocation] = useState('');
  const [venuePrice,setVenuePrice] = useState(0)
  const [venueDescription, setVenueDescription] = useState('');
  const [venueImages, setVenueImages] = useState([]); // Use an array to store multiple images

  const handleImageChange = (e) => {
    // Use 'multiple' attribute to allow multiple file selection
    setVenueImages(e.target.files);
  };

  const handleVenueNameChange = (e) => {
    setVenueName(e.target.value);
  };

  const handleVenueLocationChange = (e) => {
    setVenueLocation(e.target.value);
  };

  const handleVenueDescriptionChange = (e) => {
    setVenueDescription(e.target.value);
  };

  const handleVenuePriceChange = (e) => {
    setVenuePrice(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('venueName', venueName);
    formData.append('venueLocation', venueLocation);
    formData.append('venuePrice', venuePrice);
    formData.append('venueDescription', venueDescription);

    // Append each selected image to the formData
    for (let i = 0; i < venueImages.length; i++) {
      formData.append('images', venueImages[i]);
    }

    axios
      .post('http://localhost:8000/addData', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'Venue Registered',
            text: 'Your venue has been successfully registered!',
          });

          // Clear the form fields and reset the venueImages
          setVenueName('');
          setVenueLocation('');
          setVenuePrice('');
          setVenueDescription('');
          setVenueImages([]);
        }
      }).then(() => navigate("/VenueMain"))
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Venue With The Same Name Exist', // Display the error message from the response
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
          <h1 className="mb-0">Register Your Venue</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="venueName" className="form-label" style={{ fontWeight: 'bold' }}> Venue Name: </label>
              <input type="text" className="form-control" id="venueName" value={venueName} onChange={handleVenueNameChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="venueLocation" className="form-label" style={{ fontWeight: 'bold' }}> Venue Location:</label>
              <input type="text" className="form-control" id="venueLocation" value={venueLocation} onChange={handleVenueLocationChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="VenuePrice" className="form-label" style={{ fontWeight: 'bold' }}> Venue Price:</label>
              <input type="number" className="form-control" id="VenuePrice" value={venuePrice} onChange={handleVenuePriceChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="venueDescription" className="form-label" style={{ fontWeight: 'bold' }}>
                Venue Description:
              </label>
              <textarea className="form-control" id="venueDescription" rows="4" value={venueDescription} onChange={handleVenueDescriptionChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="venueImage" className="form-label" style={{ fontWeight: 'bold' }}>Venue Image:</label>
              <input type="file" className="form-control" id="venueImage" accept="image/*" onChange={handleImageChange} multiple required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007bff', border: 'none' }}>Register Venue</button>
          </form>
        </div>
      </div>
    </div>
  )
        }

export default RegisterVenue;
