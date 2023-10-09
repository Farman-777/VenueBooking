import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

// import ModalCompOne from "./Component/PhotoGrapher/ModalCompOne";
// import ModalCompTwo from "./Component/Cater/ModalCompTwo";
// import ModalCompThree from "./Component/DJ/ModalCompThree";
import ModalComp from "./ModalComp";

import BookPhotographer from './Component/PhotoGrapher/BookPhotographer'
import BookCater from "./Component/Cater/BookCater";
import BookDJ from "./Component/DJ/BookDJ";
import BookVenue from "./Component/Venue/BookVenue";

// import ModalComponent from "./ModalComponent";

const CartItem = ({ name, price, imageUrl, imageName, id, getData ,keyName}) => {
  const [showModal,setShowModal] = useState(false);
  console.log("id : ", id);
  console.log("name : ", name);
  console.log(`${imageUrl}${imageName}`);

  console.log("keyName : ",keyName);
  const comp =  ["BookVenue","BookCater","BookDJ","BookPhotographer"];

  const handleClick = () => {
    console.log("itemNew");
  };
  const obj = { CartKey1: id };

  console.log(obj.CartKey1);

  const handleDelete = () => {
    axios.post("http://localhost:8006/deleteCart", obj).then((response) => {
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Cart Item Deleted",
          text: "Successfully!",
        });
        getData();
      }
    });
  };
  const temp = [BookVenue];
  return (
    <>
      <div className="cart-parent">
        <img src={`${imageUrl}${imageName}`} alt="" />
        <div className="item-details">
          <div className="item-info">
            <span>{name}</span>
            <p>Price: {price}</p>
          </div>
          <div className="item-actions">
            <h6 className="border border-2 border-success mt-2 p-1">
              01-02-23
            </h6>
          </div>
        </div>
        <button
          type="date"
          className="btn btn-success"
          onClick={() => {
            console.log("hi : ", name);
            handleClick();
            setShowModal(true);
          }}
        >
          Select Date
        </button>
        <button className="btn btn-danger" onClick={() => handleDelete()}>
          Remove
        </button>
      </div>
      <ModalComp
        show={showModal}
        width={"90%"}
        modalBody={
        (keyName === "DJName") ? <BookDJ handleClose={() => setShowModal(false)} /> :
        (keyName === "CaterName") ? <BookCater handleClose={() => setShowModal(false)} /> :
        (keyName === "PhotoGrapherName") ? <BookPhotographer handleClose={() => setShowModal(false)} /> :
        (keyName === "VenueName") ? <BookVenue handleClose={() => setShowModal(false)} /> :
        null
    }
      />
    </>
  );
};

export default CartItem;
