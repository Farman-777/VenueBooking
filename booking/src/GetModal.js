import React, { useState } from 'react'

import ModalComp from "./Component/Venue/ModalComp";
import ModalCompOne from "./Component/PhotoGrapher/ModalCompOne";
import ModalCompTwo from "./Component/Cater/ModalCompTwo";
import ModalCompThree from "./Component/DJ/ModalCompThree";

import BookVenue from "./Component/Venue/BookVenue";
import BookPhotographer from "./Component/PhotoGrapher/BookPhotographer";
import BookCater from "./Component/Cater/BookCater";
import BookDJ from "./Component/DJ/BookDJ";

const GetModal  = (bookNameKey,showDateModal,setShowDateModal) => {
    const [showDateModal, setShowDateModal] = useState(false);
    const [showDateModal1, setShowDateModal1] = useState(false);
    const [showDateModal2, setShowDateModal2] = useState(false);
    const [showDateModal3, setShowDateModal3] = useState(false);

    console.log("bookNameKey : ",bookNameKey)
    switch (bookNameKey) {
      case 'VenueName':
        return <ModalComp show={showDateModal} width={"90%"} modalBody={<BookVenue handleClose={() => setShowDateModal(false)} />} />;
      case 'PhotographerName':
        return <ModalCompOne show={showDateModal1} width={"90%"} modalBody={<BookPhotographer handleClose={() => setShowDateModal1(false)} />} />;
      case 'CaterName':
        return <ModalCompTwo show={showDateModal2} width={"90%"} modalBody={<BookCater handleClose={() => setShowDateModal2(false)} />} />;
      case 'DJName':
        return <ModalCompThree show={showDateModal3} width={"90%"} modalBody={<BookDJ handleClose={() => setShowDateModal3(false)} />} />;
      default:
        return null;
    }
  };

export default GetModal;
