import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";


const SignUp = ({ handleClose }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  

  const handleSubmit = (e) => {
    e.preventDefault();
    const lowercaseUserName = userName.toLowerCase();
    const userObj = {
      userName: userName,
      userEmail: userEmail,
      userPassword: userPassword,
    };

    console.log(userObj); // Check if userObj is logged to the console
    if (
      userEmail.trim() !== "" &&
      userName.trim() !== "" &&
      userPassword.trim() !== ""
    ) {
      axios
        .post("http://localhost:8005/addUserData", userObj)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "User Registered",
              text: "User has been successfully registered!",
            });
            // Clear the form fields
            setUserName("");
            setUserEmail("");
            setUserPassword("");

            // Call handleClose only when all fields are non-empty
            handleClose();
          }
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "User with the same email already exists",
          });
          // Clear the form fields
          setUserName("");
          setUserEmail("");
          setUserPassword("");
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
        className="fs-3 text-start"
      >
        <div className="mb-3">
          <label htmlFor="userName" className="form-label">
            Name
          </label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            // style={{ width: "75%", position: "relative", left: "100px" }}
            type="text"
            className="form-control"
            id="userName"
            required
          />
        </div>
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
        <div className="mb-3">
          <label htmlFor="userPassword" className="form-label">
            Password
          </label>
          <input
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
            // style={{ width: "75%", position: "relative", left: "100px" }}
            type="password"
            className="form-control"
            id="userPassword"
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

export default SignUp;
