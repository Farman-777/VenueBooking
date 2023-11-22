import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import ModalComponent from "../ModalComponent";
import Forget from "../Authentication/Forget";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const SignIn = ({ handleClose,handleEmail }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showDateModal ,setShowDateModal] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObj = {
      userEmail: userEmail,
      userPassword: userPassword,
    };
    handleEmail(userEmail);

    if(userEmail === "x@gmail.com" && userPassword === "12345"){      
      if (
        userEmail.trim() !== "" &&
        userPassword.trim() !== ""
        ) {
          axios.post("http://localhost:8005/getUserData", userObj)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({ icon: "success", title: "", text: "SignIn Successfully", });
            // Clear the form fields
            setUserEmail("");
            setUserPassword("");
            
            // Call handleClose only when all fields are non-empty
            dispatch({ type: "loginAdmin" });
            navigate("/admin");
            handleClose();
          }      
        })
        .catch(error => { Swal.fire({ icon: "error", title: "", text: "Check Email Or Password", }); })
        
      } else { Swal.fire({ icon: "warning", title: "", text: "Please Fill All Fields", }); }
    }
    else{
      if (
        userEmail.trim() !== "" &&
        userPassword.trim() !== ""
        ) {
          axios.post("http://localhost:8005/getUserData", userObj).then((response) => {
          if (response.status === 200) {
            Swal.fire({ icon: "success", title: "", text: "SignIn Successfully", });
            
            setUserEmail("");
            setUserPassword("");
            
            dispatch({ type: "loginUser" });
            dispatch({ type: 'addUser', payload: "12345" });
      
            handleClose();
          }      
        })
        .catch(error => { Swal.fire({ icon: "error", title: "", text: "Check Email Or Password", }); })        
      } else { Swal.fire({ icon: "warning", title: "", text: "Please Fill All Fields", }); }
    }
}

    
  return (
    <div>
      <form
        style={{ background: "#333333", color: "white", padding: "25px", borderRadius: "12px", border: "1px solid white", }} className="fs-3 text-start mt-4" >
        <div className="mb-3"> <label htmlFor="userEmail" className="form-label"> Email address </label>
          <input onChange={(e) => setUserEmail(e.target.value)} value={userEmail} type="email" className="form-control" id="userEmail" required />
        </div>
        <div className="mb-3"> <label htmlFor="userPassword" className="form-label"> Password </label>
          <input onChange={(e) => setUserPassword(e.target.value)} value={userPassword} type="password" className="form-control" id="userPassword" required />
        </div>

        <button type="submit" className="btn btn-primary" onClick={handleSubmit} >Submit</button> 
        <hr/>
        <p className="fs-5 " role="button" tabindex="0"  onClick={() => { setShowDateModal(true) }}>Forgot password?</p>        
      </form>
      <ModalComponent
        show={showDateModal}
        width={"45%"}
        marginTop={"17%"}
        modalBody={<Forget handleClose={() => setShowDateModal(false)}  />} />
    </div>
  );
};

export default SignIn;
