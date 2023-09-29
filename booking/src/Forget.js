import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import OTP from "./OTP";
import ModalComponent from "./ModalComponent";

const Forget = ({ handleClose }) => {
  const [showDateModal1,setShowDateModal1] = useState(false)
  const [userEmail, setUserEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const userObj = {
      userEmail: userEmail,
    };

    console.log(userObj); // Check if userObj is logged to the console
    if (userEmail.trim() !== "" ) {
      axios
        .post("http://localhost:8005/sentEmail", userObj)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Email sent",
              text: "Check Your Email!",
            });
            // Clear the form fields
            setUserEmail("");
            
            // Call handleClose only when all fields are non-empty
            // handleClose();
            setShowDateModal1(true);
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Incorrect Email",
            text: "Entered email is not registered",
          });
          // Clear the form fields
          setUserEmail("");
        });
    } else {
      // Display a message or handle the case where not all fields are filled
      Swal.fire({
        icon: "warning",
        title: "",
        text: "Please Enter Email",
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
          <label htmlFor="userEmail" className="form-label">
            Email address
          </label>
          <input
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            // style={{ width: "75%", position: "relative", left: "100px" }}
            type="email"
            className="form-control"
            id="userEmail"
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
        show={showDateModal1}
        width={"45%"}
        marginTop={"17%"}
        modalBody={<OTP handleClose={() => setShowDateModal1(false)} handleClose1={handleClose}  email={userEmail}/>} />
    </div>
  );
};

export default Forget;
