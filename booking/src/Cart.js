import React, { useState } from "react";
import "./Cart.css";
import CartItem from "./CartItem";

const Cart = ({ cartData, setCartData }) => {
  const [appUrl, setAppUrl] = useState([
    "http://localhost:8000/images/",
    "http://localhost:8001/Images/",
    "http://localhost:8002/Images/",
    "http://localhost:8003/images/",
  ]);

  console.log("newCartData  : ", cartData);

  const names = cartData.map(item => {
    const key = Object.keys(item)[2];
    return item[key];
  });

  const prices = cartData.map(item => {
    const key = Object.keys(item)[4];
    return item[key];
  });

  const total = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  console.log("price : ", prices);
  console.log("Cart second key : ",Object.keys(cartData)[2]);

  return (
    <div>
      {cartData.length > 0 && cartData.map((item, index) => {
        if (Object.keys(item)[2] === 'VenueName') {
          return (
            <CartItem
              key={index}
              name={names[index]}
              price={prices[index]}
              imageUrl={appUrl[0]}
              imageName={item.images[1]}
            />
          );
        } else if (Object.keys(item)[2] === 'PhotographerName') {
          return (
            <CartItem
              key={index}
              name={names[index]}
              price={prices[index]}
              imageUrl={appUrl[1]}
              imageName={item.images[1]}
            />
          );
        }
        else if (Object.keys(item)[2] === 'CaterName') {
          return (
            <CartItem
              key={index}
              name={names[index]}
              price={prices[index]}
              imageUrl={appUrl[2]}
              imageName={item.images[1]}
            />
          );
        } else if (Object.keys(item)[2] === 'DJName') {
          return (
            <CartItem
              key={index}
              name={names[index]}
              price={prices[index]}
              imageUrl={appUrl[3]}
              imageName={item.images[1]}
            />
          );
        } 
        return null; // Handle other cases or return null if none match
      })}
      <div className="total">
        <span className="total-text">Total Price of your Cart</span>
        <span className="rupees">
          Rs - <span className="price">{total}</span>
        </span>
      </div>
    </div>
  );
};

export default Cart;

/*
venue:8000 appUrl: 0,
Photographer:8001 appUrl: 1,
cater:8002 appUrl: 2,
DJ:8003 appUrl: 3,
 */


// import React from "react";
// import "./Cart.css"; // Import your CSS styles as needed
// import CartItem from "./CartItem"; // Adjust the import path as needed

// const Cart = ({ cartData, setCartData }) => {
//   const [appUrl,setAppUrl] = useState([
//     `http://localhost:8002/Images/`,
//   `http://localhost:8003/images/`,
//   `http://localhost:8001/Images/`,
//   `http://localhost:8000/images/`
// ]);

//   console.log("newCartData  : ", cartData);
//   // Extract names and locations
//   const names = cartData.map(item => {
//     const key = Object.keys(item)[2];
//     return item[key];
//   });
//   const prices = cartData.map(item => {
//     const key = Object.keys(item)[4];
//     return item[key];
//   });
//   const cartNames = ['CaterName','VenueName','DJName','PhotoGrapherName'];
//   // Get all keys of the object and convert them into an array
// const keysArray = Object.keys(cartData[0]);
// console.log("keysArray ",keysArray)

//   const total = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//   console.log("price : ",prices)

//   return (
//     <div>
//       {cartData?.map((item, index) => (
//         <CartItem key={index} name={names[index]} price={prices[index]} imageUrl={imageUrl[0]} imageName={item.images[1]}/>
//       ))}
//       <div className="total">
//         <span className="total-text">Total Price of your Cart</span>
//         <span className="rupees">
//           Rs - <span className="price">{total}</span>
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Cart;
