import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const Reset = ({ handleClose,handleClose1,handleClose2,passedEmail }) => {
  const [userPassword1, setUserPassword1] = useState("");
  const [userPassword2, setUserPassword2] = useState("");
  const [showDateModal1, setShowDateModal1] = useState(false);

  // console.log("passedEmail ",passedEmail)

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (userPassword1 !== userPassword2) {
      // Show an alert if passwords don't match
      Swal.fire({
        icon: "error",
        title: "",
        text: "Passwords do not match.",
      });
      return; // Prevent further execution of the function
    }

    const userObj = {
      userPassword1: userPassword1,
      userPassword2: userPassword2,
      email:passedEmail
    };

    console.log("client side reset", userObj);

    if (userPassword1.trim() !== "" && userPassword2.trim() !== "") {
      axios
        .post("http://localhost:8005/newPassword", userObj)
        .then((response) => {
          if (response.status === 200) {
            // Success message
            Swal.fire({
              icon: "success",
              title: "Password",
              text: "Changed Successfully",
            });

            // Clear the form fields
            setUserPassword1("");
            setUserPassword2("");

            // Call handleClose only when all fields are non-empty
            handleClose();
            handleClose1();
            handleClose2();
          }
        })
        .catch((error) => {
          // Error message
          Swal.fire({
            icon: "error",
            title: "",
            text: error.message,
          });
        });
    } else {
      // Display a message or handle the case where not all fields are filled
      Swal.fire({
        icon: "warning",
        title: "",
        text: "Please Fill All Fields",
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
        className="fs-3 text-start mt-4"
      >
        <div className="mb-3">
          <label htmlFor="userPassword" className="form-label">
            Enter New Password
          </label>
          <input
            onChange={(e) => setUserPassword1(e.target.value)}
            value={userPassword1}
            type="password"
            className="form-control"
            id="userPassword"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="userPassword2" className="form-label">
            Confirm Password
          </label>
          <input
            onChange={(e) => setUserPassword2(e.target.value)}
            value={userPassword2}
            type="password"
            className="form-control"
            id="userPassword2"
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
    </div>
  );
};

export default Reset;
