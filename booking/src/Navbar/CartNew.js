import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import './CartNew.css'
import axios from 'axios';
import { useSelector } from 'react-redux';

/*
venue:8000 appUrl: 0,
Photographer:8001 appUrl: 1,
cater:8002 appUrl: 2,
DJ:8003 appUrl: 3,
 */
const CartNew = ({cartData,getData}) => {
  const {VenueLength,CaterLength,DJLength,PhotographerLength } = useSelector(state => state.root)
  console.log(cartData);
  const [appUrl, setAppUrl] = useState([
    "http://localhost:8000/images/",
    "http://localhost:8001/Images/",
    "http://localhost:8002/Images/",
    "http://localhost:8003/images/",
  ]);
  console.log("keyName Object : ",cartData[0]);
  console.log("keyName Object output : ",cartData[0].CartKey);

  
  const [total, setTotal] = useState(0); // Initialize total as a state variable

  // Calculate the total price based on CartKey
 useEffect(()=>{
  for (const item of cartData) {
    if (item.CartKey === 'VenueName') {
      setTotal((prevTotal) => prevTotal + item.CartPrice * VenueLength);
    } else if (item.CartKey === 'CaterName') {
      setTotal((prevTotal) => prevTotal + item.CartPrice * CaterLength);
    } else if (item.CartKey === 'DJName') {
      setTotal((prevTotal) => prevTotal + item.CartPrice * DJLength);
    } else if (item.CartKey === 'PhotoGrapherName') {
      setTotal((prevTotal) => prevTotal + item.CartPrice * PhotographerLength);
    }
  }
 },[VenueLength,CaterLength,DJLength,PhotographerLength])
  
  // const total = 19999;

  //pament coding starting here

  const checkoutHandler = async (amount) => {
    const { data: {key} } = await axios.get("http://localhost:4000/api/getKey");
    const { data: {order} } = await axios.post("http://localhost:4000/api/checkout", {
      amount,
    });

    const options = {
      key: key, // Replace with your actual Razorpay Key
      amount: order.amount,
      currency: "INR",
      name: "Venue Booking Project",
      description: "Test Transaction",
      image: "https://d6xcmfyh68wv8.cloudfront.net/assets/razorpay-glyph.svg",
      order_id: order.id, // Use the actual order ID from the server response
      callback_url: "http://localhost:4000/api/paymentVerification",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  const reducedTotal = total * 0.3;

  return (
    <div>
      <h2>Cart Items</h2>
      <ul>
  {cartData.map((item, index) => (
    <li key={index} style={{listStyle:"none"}}>
      <CartItem
        CartId={item.CartId}
        getData={getData}
        name={item.CartTitle}
        price={item.CartPrice}
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
        keyName={item.CartKey}
      />
    </li>
  ))}
</ul>

      <div className="total">
        <span className="total-text">Total Price of your Cart</span>
        <span className="rupees"> ₹ <span className="price">{total}</span>
        </span>
      </div>
      <div className="total">
        <span className="total-text">30 % of Total Price of your Cart</span>
        <span className="rupees"> ₹ <span className="price">{reducedTotal}</span>
        </span>
      </div>
        <div> 
          <button className='btn btn-success ms-4' onClick={() => {checkoutHandler(reducedTotal);console.log(total)} }>Payment</button>
        </div>
    </div>
  );
}
export default CartNew;

