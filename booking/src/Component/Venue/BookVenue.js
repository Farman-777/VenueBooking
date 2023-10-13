import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const BookVenue = ({ handleClose,CartId }) => {
  console.log("ID in bookVenue using useParams : ",CartId)
  const [bookingDate, setBookingDate] = useState("");
  const handleBookingDateChange = (e) => {
    setBookingDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse the bookingDate string into a Date object
    const dateParts = bookingDate.split("-"); // Assuming the date is in "yyyy-mm-dd" format
    const formattedDate = new Date(
      dateParts[0],
      dateParts[1] - 1,
      dateParts[2]
    );

    const day = formattedDate.getDate().toString().padStart(2, "0");
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = formattedDate.getFullYear().toString().slice(-2);

    const formattedDateStr = `${day}-${month}-${year}`;

    const bookingData = {
      Id:CartId,
      Date: formattedDateStr,
      Status: "Booked",
    };

    try {
      const response = await axios.post(
        'http://localhost:8000/venueRecords',
        bookingData
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Booking Status',
          text: 'Your booking has been successful!',
        });

        // Clear the form field
        setBookingDate('');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message || 'An error occurred', // Display the error message from the server
      });
      console.error(error);
    }
    // const response = await axios.get(`http://localhost:8000/getVenueRecord/${CartId}`);
    const response = await axios.get(`http://localhost:8000/getVenueRecord?id=${CartId}`);
    console.log(response)
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
              <h1 >Book a Venue</h1>
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
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ backgroundColor: "#007bff", border: "none" }}
                >
                  Book Venue
                </button>
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

export default BookVenue;
