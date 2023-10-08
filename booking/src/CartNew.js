import React, { useState } from 'react';
import CartItem from './CartItem';
import './Cart.css'

/*
venue:8000 appUrl: 0,
Photographer:8001 appUrl: 1,
cater:8002 appUrl: 2,
DJ:8003 appUrl: 3,
 */
const CartNew = ({cartData}) => {
    
  const [appUrl, setAppUrl] = useState([
    "http://localhost:8000/images/",
    "http://localhost:8001/Images/",
    "http://localhost:8002/Images/",
    "http://localhost:8003/images/",
  ]);


  // Extract item names and prices correctly
  const prices = cartData.map(item => item.CartPrice);

  // Calculate the total price
  const total = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  return (
    <div>
      {/* <h2>Cart Items</h2> */}
      <ul>
  {cartData.map((item, index) => (
    <li key={index} style={{listStyle:"none"}}>
      <CartItem
        name={item.CartTitle}
        price={item.CartPrice}
        // description={item.VenueDescription || item.DJDescription || item.CaterDescription || item.PhotoGrapherDescription}
        imageUrl={
          item.CartKey === "VenueName" ? appUrl[0] :
          item.CartKey === "PhotoGrapherName" ? appUrl[1] :
          item.CartKey === "CaterName" ? appUrl[2] :
          item.CartKey === "DJName" ? appUrl[3] :
          ""
        }
        imageName={
          item.CartKey === "VenueName" ? item.image[0] :
          item.CartKey === "DJName" ? item.image[0] :
          item.CartKey === "CaterName" ? item.image[0] :
          item.CartKey === "PhotoGrapherName" ? item.image[0] :
          ""
        }
        id={item._id}
      />
    </li>
  ))}
</ul>

      <div className="total">
        <span className="total-text">Total Price of your Cart</span>
        <span className="rupees">
          Rs - <span className="price">{total}</span>
        </span>
      </div>
    </div>
  );
}
export default CartNew;

/*
venue:8000 appUrl: 0,
Photographer:8001 appUrl: 1,
cater:8002 appUrl: 2,
DJ:8003 appUrl: 3,
 */

/*
New Cart
import React, { useState } from 'react';
import CartItem from './CartItem';


const CartNew = () => {
    
    const [appUrl, setAppUrl] = useState([
      "http://localhost:8000/images/",
      "http://localhost:8001/Images/",
      "http://localhost:8002/Images/",
      "http://localhost:8003/images/",
    ]);
    const cartData = [
      {
        "VenueName": "Central Plaza",
        "VenueLocation": "Connaught Place, New Delhi",
        "VenuePrice": 80000,
        "images":["images-1696656210563.jpg"],
        "VenueDescription": "Central Plaza is a versatile event space located in the heart of Connaught Place. It offers a blend of modern amenities and a historic backdrop, making it a popular choice for conferences, art exhibitions, and cultural events."
      },
      {
        "DJName": "GrooveMaster DJ Services",
        "DJLocation": "Connaught Place, New Delhi",
        "DJPrice": 5000,
        "images":["images-1696240867624.jpg"],
        "DJDescription": "GrooveMaster DJ Services is your go-to choice for electrifying music and entertainment in Connaught Place. We specialize in DJ services for parties, weddings, and corporate events."
      },
      {
        "CaterName": "Taste of India Caters",
        "CaterLocation": "South Extension, New Delhi",
        "CaterPrice": 6500,
        "images":["images-1696241564359.jpg"],
        "CaterDescription": "Taste of India Caters based in South Extension bring the flavors of India to your events. From traditional cuisine to fusion delights, we cater to your every taste."
      },
      {
        "PhotoGrapherName": "PixelPerfect PhotoGraphers",
        "PhotoGrapherLocation": "South Extension, New Delhi",
        "PhotoGrapherPrice": 8000,
        "images":["images-1696658036439.jpg"],
        "PhotoGrapherDescription": "PixelPerfect PhotoGraphers based in South Extension create visual perfection. Our photography services cover weddings, fashion shoots, and special occasions."
      },
    ];
  
    // Extract item names and prices correctly
    const names = cartData.map(item => item.VenueName || item.DJName || item.CaterName || item.PhotoGrapherName);
    const prices = cartData.map(item => item.VenuePrice || item.DJPrice || item.CaterPrice || item.PhotoGrapherPrice);
  
    // Calculate the total price
    const total = prices.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  
    return (
      <div>
        <h2>Cart Items</h2>
        <ul>
    {cartData.map((item, index) => (
      <li key={index} style={{listStyle:"none"}}>
        <CartItem
          name={item.VenueName || item.DJName || item.CaterName || item.PhotoGrapherName}
          price={item.VenuePrice || item.DJPrice || item.CaterPrice || item.PhotoGrapherPrice}
          description={item.VenueDescription || item.DJDescription || item.CaterDescription || item.PhotoGrapherDescription}
          imageUrl={
            item.VenueName ? appUrl[0] :
            item.PhotoGrapherName ? appUrl[1] :
            item.CaterName ? appUrl[2] :
            item.DJName ? appUrl[3] :
            ""
          }
          imageName={
            item.VenueName ? item.images[0] :
            item.DJName ? item.images[0] :
            item.CaterName ? item.images[0] :
            item.PhotoGrapherName ? item.images[0] :
            ""
          }
        />
      </li>
    ))}
  </ul>
  
        <div className="total">
          <span className="total-text">Total Price of your Cart</span>
          <span className="rupees">
            Rs - <span className="price">{total}</span>
          </span>
        </div>
      </div>
    );
  }
  export default CartNew;
    
*/
