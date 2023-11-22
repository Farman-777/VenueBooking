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
  const [selectedDate, setSelectedDate] = useState("");
 
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

  const deleteVenueBookDateRecord = () => {
    if(selectedDate !== "" && selectedDate !== undefined){
    const year = selectedDate.split("-")[0].slice(-2);
    const formattedDate = `${year}-${selectedDate.split("-")[1]}-${selectedDate.split("-")[2]}`;
    console.log(formattedDate,CartId)
    axios.post("http://localhost:8000/removeVenueBookDate",{Id:CartId,Date:formattedDate})
    .then(result => {
      if(result.status === 200) {
        Swal.fire("Success!","Selected date Record Deleted Successfully","success")
        handleRemove();
      }
    })
    .catch((error) => {
      if(error.response && error.response.status === 404)
      Swal.fire("Error!","Record not exist","error");
    })
    } else { return }
  }


 
 
  const deleteCaterBookDateRecord = () => {
    if(selectedDate !== "" && selectedDate !== undefined){
    const year = selectedDate.split("-")[0].slice(-2);
    const formattedDate = `${year}-${selectedDate.split("-")[1]}-${selectedDate.split("-")[2]}`;
    console.log(formattedDate,CartId)
    axios.post("http://localhost:8002/removeCaterBookDate",{Id:CartId,Date:formattedDate})
    .then(result => {
      if(result.status === 200) {
        Swal.fire("Success!","Selected date Record Deleted Successfully","success")
        handleRemove();
      }
    })
    .catch((error) => {
      if(error.response && error.response.status === 404)
      Swal.fire("Error!","Record not exist","error");
    })
    } else { return }
  }




  const deleteDJBookDateRecord = () => {
    if(selectedDate !== "" && selectedDate !== undefined){
    const year = selectedDate.split("-")[0].slice(-2);
    const formattedDate = `${year}-${selectedDate.split("-")[1]}-${selectedDate.split("-")[2]}`;
    console.log(formattedDate,CartId)
    axios.post("http://localhost:8003/removeDJBookDate",{Id:CartId,Date:formattedDate})
    .then(result => {
      if(result.status === 200) {
        Swal.fire("Success!","Selected date Record Deleted Successfully","success")
        handleRemove();
      }
    })
    .catch((error) => {
      if(error.response && error.response.status === 404)
      Swal.fire("Error!","Record not exist","error");
    })
    } else { return }
  }
 
  const deletePhotoGrapherBookDateRecord = () => {
    if(selectedDate !== "" && selectedDate !== undefined){
    const year = selectedDate.split("-")[0].slice(-2);
    const formattedDate = `${year}-${selectedDate.split("-")[1]}-${selectedDate.split("-")[2]}`;
    console.log(formattedDate,CartId)
    axios.post("http://localhost:8001/removePhotoGrapherBookDate",{Id:CartId,Date:formattedDate})
    .then(result => {
      if(result.status === 200) {
        Swal.fire("Success!","Selected date Record Deleted Successfully","success")
        handleRemove();
      }
    })
    .catch((error) => {
      if(error.response && error.response.status === 404)
      Swal.fire("Error!","Record not exist","error");
    })
    } else { return }
  }

<<<<<<< HEAD
  const handleRemove = async () => { 
    await axios.put(`http://localhost:8006/removeBookCountCart/${id}`, { UpdateBookCount: 1 }); getData(); 
  } 
  
=======

  const handleRemove = async () => {
    await axios.put(`http://localhost:8006/removeBookCountCart/${id}`, { UpdateBookCount: 1 });
  }
 
>>>>>>> 288114601e1377c881792e752dabf2ff85bbf264
const handleDelete = () => {
  axios.post("http://localhost:8006/deleteCart", obj)
  .then((response) => {
    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Cart Item Deleted",
        text: "Cart item has been deleted successfully!",
      });
      if(keyName === "VenueName") {axios.post("http://localhost:8000/deleteVenueDateRecord", { Id:CartId }); getData();}
      else if( keyName === "CaterName"){axios.post("http://localhost:8002/deleteCaterDateRecord", { Id:CartId }); getData();}
      else if( keyName === "DJName"){axios.post("http://localhost:8003/deleteDJDateRecord", { Id:CartId }); getData();}
      else if( keyName === "PhotoGrapherName"){axios.post("http://localhost:8001/deletePhotoGrapherDateRecord", { Id:CartId }); getData();}
    }
  });
}
 




return (
  <>
    <div className="cart-parent">
      <img src={`${imageUrl}${imageName}`} alt="" />
      <div className="item-details">
        <div className="item-info">
          <span>{name}</span>
          <p>Price: {price}</p>
        </div>
        <span>Booked {BookCount} Times </span>
      </div>
      <button type="date" className="btn btn-success" onClick={() => handleClick()}>Select Date</button>
      <div className="d-flex">
        {(() => {
          switch (keyName) {
            case "VenueName":
              return (
                <div>
                  <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                  <button className="btn btn-primary" onClick={deleteVenueBookDateRecord}>Remove</button>
                </div>
              );
            case "CaterName":
              return (
                <div>
                  <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                  <button className="btn btn-primary" onClick={deleteCaterBookDateRecord}>Remove</button>
                </div>
              );
              case "DJName":
                return (
                  <div>
                    <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                    <button className="btn btn-primary" onClick={deleteDJBookDateRecord}>Remove</button>
                  </div>
                );
                case "PhotoGrapherName":
                  return (
                    <div>
                      <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                      <button className="btn btn-primary" onClick={deletePhotoGrapherBookDateRecord}>Remove</button>
                    </div>
                  );
            default:
              return null;
          }
        })()}
      </div>
      <button className="btn btn-danger" onClick={() => handleDelete()}>Delete</button>
    </div>
    <ModalComp
      show={showModal}
      width={"90%"}
      modalBody={
        (keyName === "DJName") ? <BookDJ getData={getData} handleClose={() => setShowModal(false)} CartId={CartId} id={id} /> :
        (keyName === "CaterName") ? <BookCater getData={getData} handleClose={() => setShowModal(false)} CartId={CartId} id={id} /> :
        (keyName === "PhotoGrapherName") ? <BookPhotographer getData={getData} handleClose={() => setShowModal(false)} CartId={CartId} id={id} /> :
        (keyName === "VenueName") ? <BookVenue getData={getData} handleClose={() => setShowModal(false)} CartId={CartId} id={id} /> :
        null
      }
    />
  </>
);

};


export default CartItem;

// import { useDispatch, useSelector } from "react-redux";
// import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";
// import axios from "axios";

// import ModalComp from "../ModalComp";

// import BookPhotographer from '../Component/PhotoGrapher/BookPhotographer'
// import BookCater from "../Component/Cater/BookCater";
// import BookDJ from "../Component/DJ/BookDJ";
// import BookVenue from "../Component/Venue/BookVenue";

// const CartItem = ({ name, price, imageUrl, imageName, id, getData ,keyName,CartId ,BookCount}) => {
//   const {isAuthenticatedUser} = useSelector(state => state.root)
//   const [showModal,setShowModal] = useState(false);
  
//   console.log("id : ", id); 
//   console.log("name : ", name);
//   console.log(`${imageUrl}${imageName}`);
//   console.log("keyName : ",keyName);

//   const handleClick = () => {
//     if (isAuthenticatedUser) {
//       setShowModal(true);
//     } else {
//       Swal.fire('error','User Not Logged In','Please log in to continue.',);
//     }
//   };

//   const obj = { CartKey1: id };
//   console.log(obj.CartKey1);

//   const handleRemove = () => {   
//     axios.put(`http://localhost:8006/removeBookCountCart/${id}`, { UpdateBookCount: 1, })
//     .then((response) => { Swal.fire("Updated!", "Venue Book status has been updated.", "success"); })
//     .catch((error) => {     
//       axios.post("http://localhost:8006/deleteCart", obj)
//       .then((response) => {
//       if (response.status === 200) { Swal.fire({ icon: "success", title: "Cart Item Deleted", text: "Successfully!",  }); 
      
//     }
//     });
//   });
 
// }


//   return (
//     <>
//       <div className="cart-parent">
//         <img src={`${imageUrl}${imageName}`} alt="" />
//         <div className="item-details"><div className="item-info"> <span>{name}</span> <p>Price: {price}</p> </div> <span>Booked {BookCount} Times </span> </div>
//         <button type="date" className="btn btn-success" onClick={() => {handleClick();}}>Select Date</button>
//         <button className="btn btn-danger" onClick={() => handleRemove()}>Remove</button>
//       </div>
//       <ModalComp show={showModal} width={"90%"}
//         modalBody={
//         (keyName === "DJName") ? <BookDJ handleClose={() => setShowModal(false)} CartId={CartId} id={id}/> :
//         (keyName === "CaterName") ? <BookCater handleClose={() => setShowModal(false)} CartId={CartId} id={id}/> :
//         (keyName === "PhotoGrapherName") ? <BookPhotographer handleClose={() => setShowModal(false)} CartId={CartId} id={id}/> :
//         (keyName === "VenueName") ? <BookVenue handleClose={() => setShowModal(false)} CartId={CartId} id={id}/> :
//         null
//     }
//       />
//     </>
//   );
// };

// export default CartItem;
