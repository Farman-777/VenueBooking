import React, { useEffect, useState } from "react";
import DateModalVenue from './DateModalVenue'
import ModalComp from "../../ModalComp";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const VenueBookingB5 = ({handleAppVenueItem}) => {
  const { id } = useParams();
  const {userID} = useSelector(state => state.root);
  const [showDateModal, setShowDateModal] = useState(false);
  const [VenueData, setVenueData] = useState({
    images: []
  });
  // window.alert(id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== undefined) {
          const response = await axios.get(
            `http://localhost:8000/getData/${id}`
          );
          setVenueData(response.data);

        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [id]);


  const handleBooking = (item) => { 
    if (userID.length > 0) { 
      const itemWithUserID = {
        ...item,
        userID: userID
      };
      console.log(itemWithUserID);
      handleAppVenueItem(itemWithUserID);
    } 
  }
  return (
    <div className="container " style={{ marginTop: "9%" ,marginBottom: "15%"}}>
      <div className="row shadow-lg">
        <div className="col-md-6 p-0">
          <div
            id="carouselExampleIndicators"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={`http://localhost:8000/images/${VenueData?.images[0]}`}
                  className="d-block w-100"
                  alt="Venue Image 1"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={`http://localhost:8000/images/${VenueData?.images[1]}`}
                  className="d-block w-100"
                  alt="Venue Image 2"
                />
              </div>
              <div className="carousel-item">
                <img
                 src={`http://localhost:8000/images/${VenueData?.images[2]}`}
                  className="d-block w-100"
                  alt="Venue Image 3"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <h2
            style={{
              color: "#007BFF",
              fontWeight: "600",
              marginTop: "1%",
              fontFamily: "roboto",
            }}
          >
            {VenueData.VenueName}
          </h2>
          <p style={{ color: "#6C757D" }}>
            <span className="fw-bold text-dark">Description</span> <br />
            {VenueData.VenueDescription}
          </p>
          <p style={{ color: "#28A745" }} className="fs-5">
            <span className="fw-bold text-dark">Price</span> :{" "}
            <span style={{ fontWeight: "600" }}>₹{VenueData.VenuePrice}</span>
          </p>

          <button
            className="btn btn-danger"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.53) 0px 3px 6px",
            }}
            onClick={() => {
              setShowDateModal(true)
            }}
          >
            Check Availability
          </button>
          <button
            className="btn btn-success ms-4"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.53) 0px 3px 6px",
            }}
            onClick={() => handleBooking(VenueData)}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <ModalComp
        show={showDateModal}
        width={"90%"}
        modalBody={<DateModalVenue handleClose={() => setShowDateModal(false)} id={id}/>}
      />

    </div>
  );
};

export default VenueBookingB5;
