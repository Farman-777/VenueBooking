import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

import ModalComp from "../ModalComp";

import BookPhotographer from '../Component/PhotoGrapher/BookPhotographer'
import BookCater from "../Component/Cater/BookCater";
import BookDJ from "../Component/DJ/BookDJ";
import BookVenue from "../Component/Venue/BookVenue";

const CartItem = ({ name, price, imageUrl, imageName, id, getData ,keyName,CartId ,BookCount}) => {
  const {isAuthenticatedUser} = useSelector(state => state.root)
  const [showModal,setShowModal] = useState(false);
  
  console.log("id : ", id); 
  console.log("name : ", name);
  console.log(`${imageUrl}${imageName}`);
  console.log("keyName : ",keyName);

  const handleClick = () => {
    if (isAuthenticatedUser) {
      setShowModal(true);
    } else {
      Swal.fire('error','User Not Logged In','Please log in to continue.',);
    }
  };

  const obj = { CartKey1: id };
  console.log(obj.CartKey1);

  const handleDelete = () => {
   
    axios.put(`http://localhost:8006/removeBookCountCart/${id}`, { UpdateBookCount: 1, })
    .then((response) => { Swal.fire("Updated!", "Venue Book status has been updated.", "success"); })
    .catch((error) => {     
      axios.post("http://localhost:8006/deleteCart", obj)
      .then((response) => {
      if (response.status === 200) { Swal.fire({ icon: "success", title: "Cart Item Deleted", text: "Successfully!",  }); 
      getData(); }
    });
  });
 
}


  return (
    <>
      <div className="cart-parent">
        <img src={`${imageUrl}${imageName}`} alt="" />
        <div className="item-details"><div className="item-info"> <span>{name}</span> <p>Price: {price}</p> </div> <span>Booked {BookCount} Times </span> </div>
        <button type="date" className="btn btn-success" onClick={() => {handleClick();}}>Select Date</button>
        <button className="btn btn-danger" onClick={() => [handleDelete]()}>Remove</button>
      </div>
      <ModalComp show={showModal} width={"90%"}
        modalBody={
        (keyName === "DJName") ? <BookDJ handleClose={() => setShowModal(false)} CartId={CartId} id={id}/> :
        (keyName === "CaterName") ? <BookCater handleClose={() => setShowModal(false)} CartId={CartId} id={id}/> :
        (keyName === "PhotoGrapherName") ? <BookPhotographer handleClose={() => setShowModal(false)} CartId={CartId} id={id}/> :
        (keyName === "VenueName") ? <BookVenue handleClose={() => setShowModal(false)} CartId={CartId} id={id}/> :
        null
    }
      />
    </>
  );
};

export default CartItem;
