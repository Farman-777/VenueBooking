import React from 'react'
import { Route,Routes } from 'react-router-dom';
import MainComponent from './Component/MainComponent';
import VenueBookingB5 from './Component/VenueBookingB5';
// import RegisterVenue from './Component/RegisterVenue';

const App = () => {
  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<MainComponent />} />
      <Route path="/venueBook/:id" element={<VenueBookingB5 />} />
      </Routes>      
    </div>
  )
}

export default App;




/*
  Local:            http://localhost:3000        
  On Your Network:  http://192.168.144.1:3000   
*/
