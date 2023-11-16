import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BookVenue = ({ handleClose, CartId , id , }) => {
  console.log("ID in bookVenue using Props : ", CartId);
  const [bookingDate, setBookingDate] = useState("");
  
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  

  const handleBookingDateChange = (e) => { setBookingDate(e.target.value); };

  const handleSubmit = async (e) => { e.preventDefault(); 

    // Parse the bookingDate string into a Date object
    const dateParts = bookingDate.split("-");
    const formattedDate = new Date( dateParts[0], dateParts[1] - 1, dateParts[2] );

    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = formattedDate.getFullYear().toString().slice(-2);
    const formattedDateStr = `${day}-${month}-${year}`;

    const bookingData = { Id: CartId, Date: formattedDateStr, Status: "Booked", };

   // Sending a POST request to create a booking record
axios.post("http://localhost:8000/venueRecords", bookingData)
.then((response) => {
  if (response.status === 200) {

    axios.put(`http://localhost:8006/updateBookCountCart/${id}`, { UpdateBookCount: 1, })
    .then((response) => {  Swal.fire("Booking Status","Your booking has been successful!","success",); })
    .catch((error) => { Swal.fire("Error", "Failed to update VenueBook status", "error"); });

    setBookingDate("");
  } else { console.error("Unexpected response status:", response.status); }
}).catch((error) => {Swal.fire("Already Booked", "Please Select Different Date", "error"); });


  axios.get(`http://localhost:8000/getVenueRecord?id=${CartId}`)
  .then((response) => { console.log(response); })
  .catch((error) => {   console.error("Error while retrieving venue records:", error); });
};

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card">
            <div
              className="card-header p-0"
              style={{ backgroundColor: "#007bff", color: "#fff", textAlign: "center" }}
            >
              <h1>Book a Venue</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="bookingDate" className="form-label" style={{ fontWeight: "bold" }}>
                    Booking Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="bookingDate"
                    value={bookingDate}
                    onChange={handleBookingDateChange}
                    required
                    min={getCurrentDate()}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#007bff", border: "none" }}>
                  Book Venue
                </button>
              </form>
            </div>
          </div>
          <div className="text-end mt-4">
            <button type="button" className="btn btn-danger" onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookVenue;
