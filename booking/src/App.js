import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import Swal from "sweetalert2";
import axios from "axios";

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
import CartNew from "./Navbar/CartNew";
import AdminRequestList from "./Navbar/AdminRequestList";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import { useSelector } from "react-redux";
import SignUp from "./Navbar/SignUp";
import Temp from './Temp';

import PaymentSuccess from './payComps/PaymentSucess'

const App = () => {
  const {isAuthenticated,userID} = useSelector(state => state.root);
  const [show, setShow] = useState(localStorage.getItem("show") === "true" || false);
  const [cartData, setCartData] = useState([]);


  useEffect(() => {
    localStorage.setItem("show", show);
  }, [show]);

  const handleCartItem = (item) => {
    console.log("Cart recieved : ",item)
    const obj = {
      CartId:item._id,
      CartKey:item.VenueName ? "VenueName" : item.DJName ? "DJName" : item.CaterName ? "CaterName" : item.PhotoGrapherName ? "PhotoGrapherName" : "",
      title: item.VenueName ? item.VenueName : item.DJName ? item.DJName : item.CaterName ? item.CaterName : item.PhotoGrapherName ? item.PhotoGrapherName : "",
      price: item.VenuePrice ? item.VenuePrice : item.DJPrice ? item.DJPrice : item.CaterPrice ? item.CaterPrice : item.PhotoGrapherPrice ? item.PhotoGrapherPrice : "",
      image: [item.VenueName ? item.images[0] : item.DJName ? item.images[0] : item.CaterName ? item.images[0] : item.PhotoGrapherName ? item.images[0] : ""],
      userID:item.userID,
    };

    console.log("cart Item in App: ", obj);

    if (!cartData) {
      setCartData([]);
    }
      axios.post('http://localhost:8006/addCart', obj, { headers: { 'Content-Type': 'multipart/form-data' }, })
        .then((response) => {
          if (response.status === 200) { Swal.fire({ icon: 'success', title: 'Cart Item Added', text: 'Successfully!', }); }
          getData();
        })
        .catch((error) => { Swal.fire({ icon: "warning", title: "Item Already Added", text: "This item is already in your cart.", }); });

    }

  const getData = () => { axios.get(`http://localhost:8006/getCart/${userID}`).then(result => setCartData(result.data)) }
  // const getData = () => { axios.get(`http://localhost:8006/getCart/${userId}`, { params: { id: userID } }).then(result => setCartData(result.data)) }

  useEffect(() => {
    if(userID.length > 0){ getData(); }
  }, [userID]);

  return (
    <div className="App">
      {cartData.length ? <Header setShow={setShow} cartLength={cartData.length}/> : <Header setShow={setShow} cartLength={0}/>}
      {/* <Home /> */}
      {show ? (
        <Routes>
          <Route path="/" element={<HomePage/>} />

          <Route path="/VenueMain" element={<MainComponent />} />
          <Route path="/venueBookingB5/:id" element={<VenueBookingB5 handleAppVenueItem={handleCartItem} />} />
          <Route path="/registerVenue" element={<RegisterVenue />} />

          <Route path="/DJMain" element={<MainComponentThree />} />
          <Route path="/DJBookingB5/:id" element={<DJBookingB5 handleAppDJItem={handleCartItem} />} />
          <Route path="/registerDJ" element={<RegisterDJ />} />

          <Route path="/CaterMain" element={<MainComponentTwo />} />
          <Route path="/CaterBookingB5/:id" element={<CaterBookingB5 handleAppCaterItem={handleCartItem} />} />
          <Route path="/registerCater" element={<RegisterCater />} />

          <Route path="/PhotographerMain" element={<MainComponentOne />} />
          <Route path="/PhotoGrapherBookingB5/:id" element={<PhotoGrapherBookingB5 handleAppPhotoGraphItem={handleCartItem} />} />
          <Route path="/registerPhotoGrapher" element={<RegisterPhotoGrapher />} />

          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/temp" element={<Temp />} />
          <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated}> <AdminRequestList /> </ProtectedRoute>} />
          <Route path="/cartnew" element={cartData.length > 0 ? <CartNew cartData={cartData} getData={getData} /> : null} />
          
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />

          </Routes>
      ) : (
        <HomePage setShow={setShow} />
      )}

      <Footer />
    </div>
  );
};

export default App;
