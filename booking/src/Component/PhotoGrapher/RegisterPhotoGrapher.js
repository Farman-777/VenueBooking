import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

const RegisterPhotoGrapher = () => {
  const [PhotoGrapherName, setPhotoGrapherName] = useState('');
  const [PhotoGrapherLocation, setPhotoGrapherLocation] = useState('');
  const [PhotoGrapherDescription, setPhotoGrapherDescription] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('PhotoGrapherName', PhotoGrapherName);
    formData.append('PhotoGrapherLocation', PhotoGrapherLocation);
    formData.append('PhotoGrapherDescription', PhotoGrapherDescription);

    // Append each selected image to the formData
    for (let i = 0; i < PhotoGrapherImages.length; i++) {
      formData.append('images', PhotoGrapherImages[i]);
    }

    axios
      .post('http://localhost:8002/addPhotoData', formData, {
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
          setPhotoGrapherImages([]);
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'PhotoGrapher With The Same Name Exist', // Display the error message from the response
        });
      });
  };


  return (
    <div className="container mt-2">
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
              <label htmlFor="PhotoGrapherDescription" className="form-label" style={{ fontWeight: 'bold' }}>
                PhotoGrapher Description:
              </label>
              <textarea className="form-control" id="PhotoGrapherDescription" rows="4" value={PhotoGrapherDescription} onChange={handlePhotoGrapherDescriptionChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="PhotoGrapherImage" className="form-label" style={{ fontWeight: 'bold' }}>PhotoGrapher Image:</label>
              <input type="file" className="form-control" id="PhotoGrapherImage" accept="image/*" onChange={handleImageChange} multiple required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007bff', border: 'none' }}>Register PhotoGrapher</button>
          </form>
        </div>
      </div>
{/* <div className='ms-3 p-4' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px', marginTop: "30px", borderRadius: "10px", overflow: 'hidden', border: '1px solid #e0e0e0' }}>
      {cardData.map((user) => (
        <PhotoGrapherCard key={user._id} user={user} />
      ))}
    </div> */}
    </div>
  )
        }

export default RegisterPhotoGrapher;
