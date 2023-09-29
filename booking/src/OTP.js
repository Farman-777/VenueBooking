import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Reset from "./Reset";
import ModalComponent from "./ModalComponent";

const OTP = ({ handleClose,handleClose1 ,email}) => {
  const [userOTP, setUserOTP] = useState("");
  const [showDateModal2,setShowDateModal2] = useState(false)
  console.log("email from forget to otp",email)

  const handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      userOTP: userOTP,
    };

    console.log(userObj); // Check if userObj is logged to the console
    if (userOTP.trim() !== "" ) {
      axios
        .post("http://localhost:8005/verifyOTP", userObj)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Correct Otp",
              text: "Entered Successfully",
            });
            // Clear the form fields
            setUserOTP("");
            
            // Call handleClose only when all fields are non-empty
            // handleClose();
            // handleClose1();
            setShowDateModal2(true)
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Incorrect OTP",
            text: "Entered Valid OTP",
          });
          // Clear the form fields
        //   setUserOTP("");
        });
    } else {
      // Display a message or handle the case where not all fields are filled
      Swal.fire({
        icon: "warning",
        title: "",
        text: "Please Enter OTP",
      });
    }
  };

  return (
    <div>
      <form
        style={{
          background: "#333333",
          color: "white",
          padding: "25px",
          borderRadius: "12px",
          border: "1px solid white",
        }}
        className="fs-3 text-start"
      >
        <div className="mb-3">
          <label htmlFor="userOTP" className="form-label">
            OTP address
          </label>
          <input
            onChange={(e) => setUserOTP(e.target.value)}
            value={userOTP}
            // style={{ width: "75%", position: "relative", left: "100px" }}
            type="OTP"
            className="form-control"
            id="userOTP"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>

      <ModalComponent
        show={showDateModal2}
        width={"45%"}
        marginTop={"17%"}
        modalBody={
        <Reset 
        handleClose2={() => setShowDateModal2(false)}
        passedEmail={email} 
        handleClose={handleClose}
        handleClose1={handleClose1}
        />} />
    </div>
  );
};

export default OTP;
