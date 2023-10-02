import React,{useState} from "react";
import ModalCompOne from "./Component/PhotoGrapher/ModalCompOne";
import ModalCompTwo from "./Component/Cater/ModalCompTwo";
import ModalCompThree from "./Component/DJ/ModalCompThree";
import ModalComp from "./Component/Venue/ModalComp";
import BookPhotographer from "./Component/PhotoGrapher/BookPhotographer";
import BookCater from "./Component/Cater/BookCater";
import BookDJ from "./Component/DJ/BookDJ";
import BookVenue from "./Component/Venue/BookVenue";

const CartItem = ({ name, price }) => {
  const [showDateModal1, setShowDateModal1] = useState(false);
  return (
    <>
      <div className="cart-parent">
        <img
          src="https://images.shaadisaga.com/shaadisaga_production/photos/pictures/001/019/064/new_medium/taj_palace_delhi.JPG?1565096201"
          alt=""
        />
        <div className="item-details">
          <div className="item-info">
            <span>{name}</span>
            <p>Price: {price}</p>
          </div>
          <div className="item-actions">
            <h6 className="border border-2 border-success mt-2 p-1 ">
              01-02-23
            </h6>
          </div>
        </div>
        <button
          type="date"
          className="btn btn-success"
          onClick={() => setShowDateModal1(true)}
        >
          Select Date
        </button>
        <button className="btn btn-danger">Remove</button>
      </div>
      <ModalCompOne
        show={showDateModal1}
        width={"90%"}
        modalBody={
          <BookPhotographer handleClose={() => setShowDateModal1(false)} />
        }
      />
    </>
  );
};

export default CartItem;

