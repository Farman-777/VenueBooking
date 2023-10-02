import React from "react";
import "./Cart.css"; // Import your CSS styles as needed
import CartItem from "./CartItem"; // Adjust the import path as needed

const Cart = ({ cartData, setCartData }) => {
  console.log("newCartData  : ", cartData);
  // Extract names and locations
  const names = cartData.map(item => {
    const key = Object.keys(item)[2];
    return item[key];
  });
  const price = [1000,2000,3000];
  console.log("names : ",names)
  return (
    <div>
      {cartData?.map((item, index) => (
        <CartItem key={index} name={names[index]} price={price[index]} />
      ))}
      <div className="total">
        <span className="total-text">Total Price of your Cart</span>
        <span className="rupees">
          Rs - <span className="price">1000</span>
        </span>
      </div>
    </div>
  );
};

export default Cart;
