import React from 'react'
import { Route,Routes } from 'react-router-dom';
import MainComponent from './Component/MainComponent';
import VenueBookingB5 from './Component/VenueBookingB5';
// import FileUpload from './NewComponent/FileUpload';
import RegisterVenue from './Component/RegisterVenue';
import BookVenue from './Component/BookVenue';

const App = () => {
  return (
    <div className='App'>
      {/* <FileUpload /> */}
      {/* <RegisterVenue /> */}
      <Routes>
      <Route path="/" element={<MainComponent />} />
      <Route path="/venueBookingB5/:id" element={<VenueBookingB5 />} />
      <Route path="/registerVenue" element={<RegisterVenue />} />
      <Route path="/venueBook" element={<BookVenue />} />
      </Routes>      
    </div>
  )
}

export default App;




/*
  Local:            http://localhost:3000        
  On Your Network:  http://192.168.144.1:3000   
*/
