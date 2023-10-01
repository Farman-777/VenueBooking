import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";

import MainComponent from "./Component/Venue/MainComponent";
import VenueBookingB5 from "./Component/Venue/VenueBookingB5";
import RegisterVenue from "./Component/Venue/RegisterVenue";

import MainComponentOne from "./Component/PhotoGrapher/MainComponentOne";
import PhotoGrapherBookingB5 from "./Component/PhotoGrapher/PhotoGrapherBookingB5";
import RegisterPhotoGrapher from "./Component/PhotoGrapher/RegisterPhotoGrapher";

import MainComponentTwo from "./Component/Cater/MainComponentTwo";
import CaterBookingB5 from "./Component/Cater/CaterBookingB5";
import RegisterCater from "./Component/Cater/RegisterCater";

import MainComponentThree from "./Component/DJ/MainComponentThree";
import DJBookingB5 from "./Component/DJ/DJBookingB5";
import RegisterDJ from "./Component/DJ/RegisterDJ";

import Header from "./Navbar/Header";
import HomePage from "./HomePage";
import SignIn from "./Navbar/SignIn";

import ContactUs from "./Navbar/ContactUs";
import AboutUs from "./Navbar/AboutUs";
import Forget from "./Authentication/Forget";
import Cart from "./Cart";

const App = () => {
  // const [show, setShow] = useState(false);
  // Initialize show state with the value from localStorage or default to false
  const [show, setShow] = useState(
    localStorage.getItem("show") === "true" || false
  );
  const [cartData, setCartData] = useState([]);

  // useEffect to update localStorage when show changes
  useEffect(() => {
    localStorage.setItem("show", show);
  }, [show]);

  const handleCartItem = (item) => {
    console.log("venue item in app: ", item);

    // Check if cartData is null or undefined, and initialize it as an empty array if it is
    if (!cartData) {
      setCartData([]);
    }

    // Check if an object with a similar property exists in cartData
    if (!cartData.some((cartItem) => cartItem._id === item._id)) {
      // If not present, add it to cartData
      const updatedCartData = [...cartData, item];
      setCartData(updatedCartData);
      console.log(`cardata id : ${cartData._id} and item id : ${item._id}`);
    } else {
      // If already present, you can handle it as desired, e.g., show a message
      alert("Object with a similar property is already in the cart.");
    }
    console.log("cartData : ", cartData);
  };

  return (
    <div className="App">
      <Header setShow={setShow} />
      {cartData.length > 0 && <Cart cartData={cartData} setCartData={setCartData} />}

      {show ? (
        <Routes>
          <Route path="/VenueMain" element={<MainComponent />} />
          <Route
            path="/venueBookingB5/:id" element={<VenueBookingB5 handleAppVenueItem={handleCartItem} />}/>
          <Route path="/registerVenue" element={<RegisterVenue />} />

          <Route path="/DJMain" element={<MainComponentThree />} />
          <Route path="/DJBookingB5/:id" element={<DJBookingB5 handleAppDJItem={handleCartItem} />} />
          <Route path="/registerDJ" element={<RegisterDJ />} />

          <Route path="/CaterMain" element={<MainComponentTwo />} />
          <Route path="/CaterBookingB5/:id" element={<CaterBookingB5 />} />
          <Route path="/registerCater" element={<RegisterCater />} />

          <Route path="/PhotographerMain" element={<MainComponentOne />} />
          <Route
            path="/PhotoGrapherBookingB5/:id"
            element={<PhotoGrapherBookingB5 />}
          />
          <Route
            path="/registerPhotoGrapher"
            element={<RegisterPhotoGrapher />}
          />

          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signIn" element={<SignIn />}></Route>
          <Route path="/forget" element={<Forget />}></Route>
        </Routes>
      ) : (
        <HomePage setShow={setShow} />
      )}

      <Footer />
    </div>
  );
};

export default App;

/*
  Local:            http://localhost:3000        
  On Your Network:  http://192.168.144.1:3000   
*/
