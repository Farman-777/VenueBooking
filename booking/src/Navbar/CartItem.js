import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import ModalComp from "../ModalComp";

import BookPhotographer from '../Component/PhotoGrapher/BookPhotographer'
import BookCater from "../Component/Cater/BookCater";
import BookDJ from "../Component/DJ/BookDJ";
import BookVenue from "../Component/Venue/BookVenue";

const CartItem = ({ name, price, imageUrl, imageName, id, getData ,keyName,CartId}) => {
  const {isAuthenticatedUser, VenueLength, CaterLength, DJLength, PhotographerLength } = useSelector(state => state.root)

  const dispatch = useDispatch();
  const [showModal,setShowModal] = useState(false);
  const [itemLength,setItemLength] = useState(1);
  
  console.log("id : ", id);
  console.log("name : ", name);
  console.log(`${imageUrl}${imageName}`);
  console.log("keyName : ",keyName);

  const handleClick = () => {
    if (isAuthenticatedUser) {
      setShowModal(true);
      // Use a switch statement to increment the corresponding state variable
      switch (keyName) {
        case "VenueName":
          dispatch({ type: "incrementVenue" }); 
          setItemLength(VenueLength)

          break;
        case "CaterName":
          dispatch({ type: "incrementCater" });
          setItemLength(CaterLength)
          break;
        case "DJName":
          dispatch({ type: "incrementDJ" });
          setItemLength(DJLength)
          break;
        case "PhotoGrapherName":
          dispatch({ type: "incrementPhotographer" });
          setItemLength(PhotographerLength)
          break;
        default:
          break;
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'User Not Logged In',
        text: 'Please log in to continue.',
      });
    }
  };

  const obj = { CartKey1: id };
  console.log(obj.CartKey1);

  const handleDelete = () => {
    axios.post("http://localhost:8006/deleteCart", obj).then((response) => {
      if (response.status === 200) { 
        Swal.fire({ 
          icon: "success", title: "Cart Item Deleted", text: "Successfully!", 
        });
         getData(); }
    });
    dispatch({type:"removeVenue"});alert(VenueLength);
  };



  return (
    <>
      <div className="cart-parent">
        <img src={`${imageUrl}${imageName}`} alt="" />
        <div className="item-details"><div className="item-info"> <span>{name}</span> <p>Price: {price}</p> </div> <span>Item Added {itemLength} Times </span> </div>
        <button type="date" className="btn btn-success" onClick={() => {handleClick();}}>Select Date</button>
        <button className="btn btn-danger" onClick={() => handleDelete()}>Remove</button>
      </div>
      <ModalComp show={showModal} width={"90%"}
        modalBody={
        (keyName === "DJName") ? <BookDJ handleClose={() => setShowModal(false)} CartId={CartId}/> :
        (keyName === "CaterName") ? <BookCater handleClose={() => setShowModal(false)} CartId={CartId}/> :
        (keyName === "PhotoGrapherName") ? <BookPhotographer handleClose={() => setShowModal(false)} CartId={CartId}/> :
        (keyName === "VenueName") ? <BookVenue handleClose={() => setShowModal(false)} CartId={CartId}/> :
        null
    }
      />
    </>
  );
};

export default CartItem;
