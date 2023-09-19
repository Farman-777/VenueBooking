import React from 'react'
import { Route,Routes } from 'react-router-dom';
import Footer from './Footer';
import MainComponent from './Component/Venue/MainComponent'
import VenueBookingB5 from './Component/Venue/VenueBookingB5'
import Header from './Header';
import HomePage from './HomePage';



const App = () => {
  return (
    <div className='App'>
      {/* <MainComponentThree /> */}
      <Header />
      <HomePage />
      <Footer />  
      <Routes>
      <Route path='/main' element={<MainComponent />} />    
      <Route path='venueBookingB5/:id' element={<VenueBookingB5 />} />
      </Routes>   
 
    </div>
  )
}

export default App;




/*
  Local:            http://localhost:3000        
  On Your Network:  http://192.168.144.1:3000   
*/
