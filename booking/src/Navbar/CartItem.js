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
  const dispatch = useDispatch();
  
  const {VenueLength } = useSelector(state => state.root)
  const {isAuthenticatedUser } = useSelector(state => state.root)
  const [showModal,setShowModal] = useState(false);
  
  console.log("id : ", id);
  console.log("name : ", name);
  console.log(`${imageUrl}${imageName}`);
  console.log("keyName : ",keyName);

  const handleClick = () => {
    if (isAuthenticatedUser) { 
      setShowModal(true); dispatch({type:"incrementVenue"});alert(VenueLength+1);
     } else { 
      Swal.fire({ 
      icon: 'error', title: 'User Not Logged In', text: 'Please log in to continue.', 
    }); } console.log("itemNew"); 

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
        <div className="item-details"><div className="item-info"> <span>{name}</span> <p>Price: {price}</p> </div> </div>
        <button type="date" className="btn btn-success" onClick={() => { console.log("hi : ", name); handleClick(); }}>Select Date</button>
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
