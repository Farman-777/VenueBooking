import React, { useEffect, useState } from "react";
import DateModalPhotographer from "./DateModalPhotographer";
// import BookPhotographer from "./BookPhotographer";
import ModalComp from "../../ModalComp";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactStars from "react-stars";
import Swal from "sweetalert2";

const PhotoGrapherBookingB5 = ({handleAppPhotoGraphItem}) => {
  const {userID,isAuthenticatedUser} = useSelector(state => state.root);
  const [showDateModal, setShowDateModal] = useState(false);
  const [PhotoGrapherData, setPhotoGrapherData] = useState({
    images: []
  });
  const { id } = useParams();
  // window.alert(id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id !== undefined) {
          const response = await axios.get(
            `http://localhost:8001/getPhotoData/${id}`
          );
          setPhotoGrapherData(response.data);
          console.log(response.data)

        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchData();
  }, [id]);


  const handlePhotoGraph = (item) => { 
    if (userID.length > 0 &&  isAuthenticatedUser) { 
      const itemWithUserID = {
        ...item,
        userID: userID
      };
      console.log(itemWithUserID);
      handleAppPhotoGraphItem(itemWithUserID);
    } else{
      Swal.fire("Login alert","Please login first","error");
    }
  }

  return (
    <div className="container " style={{ marginTop: "5%" }}>
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
                  src={`http://localhost:8001/Images/${PhotoGrapherData?.images[0]}`}
                  className="d-block w-100"
                  alt="PhotoGrapher Image 1"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={`http://localhost:8001/Images/${PhotoGrapherData?.images[1]}`}
                  className="d-block w-100"
                  alt="PhotoGrapher Image 2"
                />
              </div>
              <div className="carousel-item">
                <img
                 src={`http://localhost:8001/Images/${PhotoGrapherData?.images[2]}`}
                  className="d-block w-100"
                  alt="PhotoGrapher Image 3"
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
            {PhotoGrapherData.PhotoGrapherName}
          </h2>
          <p style={{ color: "#6C757D" }}>
            <span className="fw-bold text-dark">Description</span> <br />
            {PhotoGrapherData.PhotoGrapherDescription}
          </p>
          {/* <ReactStars size={20} half={true} edit={false} value={data.rating/data.rated}/> */}
          <p className="d-flex align-items-center"> Rating : <span><ReactStars size={20} half={true} edit={false} value={4.5}/></span></p>
      
          <p style={{ color: "#28A745" }} className="fs-5">
            <span className="fw-bold text-dark">Price</span> :{" "}
            <span style={{ fontWeight: "600" }}>₹{PhotoGrapherData.PhotoGrapherPrice}</span>
          </p>

          <button
            className="btn btn-danger"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.53) 0px 3px 6px",
            }}
            onClick={() => setShowDateModal(true)}
          >
            Check Availability
          </button>
          <button
            className="btn btn-success ms-4"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.53) 0px 3px 6px",
            }}
            onClick={() => handlePhotoGraph(PhotoGrapherData)}
          >
            Add To Cart
          </button>
        </div>
      </div>
      <ModalComp
        show={showDateModal}
        width={"90%"}
        modalBody={<DateModalPhotographer handleClose={() => setShowDateModal(false)} id={id}/>}
      ></ModalComp>
{/* 
      <ModalComp
        show={showDateModal1}
        width={"90%"}
        modalBody={<BookPhotographer handleClose={() => setShowDateModal1(false)} />}
      ></ModalComp> 
      */}
    </div>
  );
};

export default PhotoGrapherBookingB5;
