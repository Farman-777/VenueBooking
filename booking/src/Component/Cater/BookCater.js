import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const BookCater = ({ handleClose,CartId ,id}) => {
  console.log("ID in bookCater using Props : ",id)
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
    const dateParts = bookingDate.split("-"); // Assuming the date is in "yyyy-mm-dd" format
    const formattedDate = new Date( dateParts[0], dateParts[1] - 1, dateParts[2] );

    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = formattedDate.getFullYear().toString().slice(-2);


    const formattedDateStr = `${year}-${month}-${day}`;
    const bookingData = { Id:CartId, Date: formattedDateStr, Status: "Booked", };

    axios.post('http://localhost:8002/bookingCater',bookingData)
    .then((response) => {
        if (response.status === 200) {

          axios.put(`http://localhost:8006/updateBookCountCart/${id}`, { UpdateBookCount: 1, })
          .then((response) => {  Swal.fire("Booking Status","Your booking has been successful!","success",); })
          .catch((error) => { Swal.fire("Error", "Failed to update VenueBook status", "error"); });  

          setBookingDate(''); }
      }).catch((error) => { Swal.fire({ icon: 'error', title: 'Error', text: error.message, }); })
  
      axios.get(`http://localhost:8002/getCaterRecord?id=${CartId}`)
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
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                textAlign: "center",
              }}
            >
              <h1 >Book a Cater</h1>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label
                    htmlFor="bookingDate"
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    Booking Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="bookingDate"
                    value={bookingDate}
                    onChange={handleBookingDateChange}
                    min={getCurrentDate()}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#007bff", border: "none" }} > Book Cater </button>
              </form>
            </div>
          </div>
          <div className="text-end mt-4">
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCater;
