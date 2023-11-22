import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import './CartNew.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import ModalComponent from '../ModalComponent';
import SignIn from './SignIn';

/*
venue:8000 appUrl: 0,
Photographer:8001 appUrl: 1,
cater:8002 appUrl: 2,
DJ:8003 appUrl: 3,
 */
const CartNew = ({cartData,getData}) => {
  const {isAuthenticatedUser } = useSelector(state => state.root)
  const [showDateModal,setShowDateModal] = useState(false);
  const [total, setTotal] = useState(0);
  console.log(cartData);
  console.log("keyName Object : ",cartData[0]);
  console.log("keyName Object output : ",cartData[0].CartKey);
  const [appUrl, setAppUrl] = useState(["http://localhost:8000/images/","http://localhost:8001/Images/","http://localhost:8002/Images/","http://localhost:8003/images/",]);

  useEffect(() => {
    // Calculate the total price based on CartKey and quantity
    let newTotal = 0;

    for (const item of cartData) {
      let itemPrice = item.CartPrice;

      if (item.CartKey === 'VenueName') {
        itemPrice *= item.BookCount;
      } else if (item.CartKey === 'CaterName') {
        itemPrice *= item.BookCount;
      } else if (item.CartKey === 'DJName') {
        itemPrice *= item.BookCount;
      } else if (item.CartKey === 'PhotoGrapherName') {
        itemPrice *= item.BookCount;
      }

      newTotal += itemPrice;

    }
    setTotal(newTotal);
  }, [cartData]);


  const checkoutHandler = async (amount) => {
    if(isAuthenticatedUser){
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
    razor.open(); } else {
      Swal.fire({
        title: 'Login Required',
        text: 'Please log in to access this feature.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Log In',
        cancelButtonText: 'Cancel',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-secondary',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          setShowDateModal(true);
        }
      });
      
    }
  };
  
  const reducedTotal = (total * 0.3).toFixed(2);

  const handleEmail = (email) => {
    console.log(email);
  }

  return (
    <>
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
        BookCount={item.BookCount}
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
    <ModalComponent
    show={showDateModal}
    width={"45%"}
    marginTop={"17%"} 
    modalBody={<SignIn handleClose={() => setShowDateModal(false)} handleEmail={handleEmail} />} />
    </>
  );
}
export default CartNew;
