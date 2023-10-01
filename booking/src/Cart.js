import React, { useEffect, useState } from "react";
import "./Cart.css";
import jsPDF from "jspdf";

// const Cart = ({ cartData, setCartData, handleChange }) => {
  const Cart = ({ cartData, setCartData}) => {

  // const Cart = ({ newItem }) => {
  
    console.log("newCartData  : ", cartData);
    
  //   const [price, setPrice] = useState(0);

  //   const handlePrice = () => {
  //     let tp = 0;
  //     cart.forEach((item) => {
  //       tp += item.amount * item.price;
  //     });
  //     setPrice(tp);
  //   };

  //   const RemoveHandler = (id) => {
  //     const newCart = cart.filter((item) => item.id !== id);
  //     setCart(newCart);
  //   };

  //   const generatePDF = () => {
  //     const doc = new jsPDF();

  //     doc.setFontSize(16);
  //     doc.text("Invoice", 20, 20);

  //     let yOffset = 40;

  //     cart.forEach((item, index) => {
  //       const itemTotal = item.amount * item.price;
  //       doc.setFontSize(12);
  //       doc.text(20, yOffset, `Item: ${item.title}`);
  //       doc.text(20, yOffset + 8, `Price: ${item.price}`);
  //       doc.text(20, yOffset + 16, `Amount: ${item.amount}`);
  //       doc.text(20, yOffset + 24, `Total: ${itemTotal}`);
  //       doc.text(20, yOffset + 32, "-------------------------------");
  //       yOffset += 40;
  //     });

  //     doc.setFontSize(14);
  //     doc.text(20, yOffset, `Total Price: ${price}`);

  //     doc.save("invoice.pdf");
  //   };

  //   useEffect(() => {
  //     handlePrice();
  //   });

  return (
    <div>
       {cartData?.map((cartData, index) => (
      <div className="cart-parent">
        <img
          src="https://images.shaadisaga.com/shaadisaga_production/photos/pictures/001/019/064/new_medium/taj_palace_delhi.JPG?1565096201"
          alt=""
        />
        <div className="item-details">
          <div className="item-info">
            <span>{cartData.VenueName}</span>
            <p>Price: 999</p>
            {/* <p>Price: {cartData.VenuePrice}</p> */}
          </div>
          <div className="item-actions">
            <button
              // onClick={() => handleChange(item, +1)}
              className="cart-button"
            >
              +
            </button>
            <span>778</span>
            <button
              // onClick={() => handleChange(item, -1)}
              className="cart-button"
            >
              -
            </button>
          </div>
        </div>
        <button
          // onClick={() => RemoveHandler(item.id)}
          className="cart-remove-button"
        >
          Remove
        </button>
      </div>
       ))}
      <div className="total">
        <span className="total-text">Total Price of your Cart</span>
        <span className="rupees">
          Rs - <span className="price">1000</span>
        </span>
      </div>
      {/* <button className="bill-button" onClick={generatePDF}>Generate Bill</button> */}
    </div>
  );
};

export default Cart;
