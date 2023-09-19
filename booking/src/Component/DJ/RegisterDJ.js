import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterDJ = () => {
  const navigate = useNavigate()
  const [DJName, setDJName] = useState('');
  const [DJLocation, setDJLocation] = useState('');
  const [DJDescription, setDJDescription] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('DJName', DJName);
    formData.append('DJLocation', DJLocation);
    formData.append('DJDescription', DJDescription);

    // Append each selected image to the formData
    for (let i = 0; i < DJImages.length; i++) {
      formData.append('images', DJImages[i]);
    }

    axios
      .post('http://localhost:8003/addDJData', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: 'DJ Registered',
            text: 'Your DJ has been successfully registered!',
          });

          // Clear the form fields and reset the DJImages
          setDJName('');
          setDJLocation('');
          setDJDescription('');
          setDJImages([]);
        }
      }).then(() => navigate("/DJMain"))
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'DJ With The Same Name Exist', // Display the error message from the response
        });
      });
  };


  return (
    <div className="container mt-2 p-4 shadow-lg">
      <div className="card">
        <div className="card-header" style={{ backgroundColor: '#007bff', color: '#fff', textAlign: 'center' }}>
          <h1 className="mb-0">Register Your DJ</h1>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="DJName" className="form-label" style={{ fontWeight: 'bold' }}> DJ Name: </label>
              <input type="text" className="form-control" id="DJName" value={DJName} onChange={handleDJNameChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="DJLocation" className="form-label" style={{ fontWeight: 'bold' }}> DJ Location:</label>
              <input type="text" className="form-control" id="DJLocation" value={DJLocation} onChange={handleDJLocationChange} required />
            </div>
            <div className="mb-3">
              <label htmlFor="DJDescription" className="form-label" style={{ fontWeight: 'bold' }}>
                DJ Description:
              </label>
              <textarea className="form-control" id="DJDescription" rows="4" value={DJDescription} onChange={handleDJDescriptionChange} required />
            </div>

            <div className="mb-3">
              <label htmlFor="DJImage" className="form-label" style={{ fontWeight: 'bold' }}>DJ Image:</label>
              <input type="file" className="form-control" id="DJImage" accept="image/*" onChange={handleImageChange} multiple required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ backgroundColor: '#007bff', border: 'none' }}>Register DJ</button>
          </form>
        </div>
      </div>
{/* <div className='ms-3 p-4' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '20px', marginTop: "30px", borderRadius: "10px", overflow: 'hidden', border: '1px solid #e0e0e0' }}>
      {cardData.map((user) => (
        <DJCard key={user._id} user={user} />
      ))}
    </div> */}
    </div>
  )
        }

export default RegisterDJ;
