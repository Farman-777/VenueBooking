import React,{useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ModalComponent from "../ModalComponent";
import SignIn from './SignIn'
import SignUp from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import imageUrl from '../Logo/CelebrateWithMe.jpeg'
// import CartNew from '../CartNew'
// import CartItem from "./CartItem";


const Header = ({setShow,cartLength}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(cartLength)
  const [showDateModal,setShowDateModal] = useState(false)
  const [showDateModal1,setShowDateModal1] = useState(false)
  const [userName,setUserName] = useState("");
  const {isAuthenticated, isAdmin,isAuthenticatedUser } = useSelector(state => state.root)
    
  useEffect(() => {
    // Check if the userName is stored in localStorage

  }, []); 
  
  const handleEmail = (email) => {
    axios.get("http://localhost:8005/getUserName", { params: { email: email } })

    .then(result => { setUserName(result.data[0].Name); dispatch({ type:"addUserID",payload:result.data[0]._id }) 
    if (userName !== "") {
      const storedUserName = localStorage.getItem("userName");
      setUserName(storedUserName);
    } 
  });
    // .then(result => {console.log(result.data[0]); });
  }

return (
<>
<nav className="navbar navbar-expand-lg navbar-dark text-center text-dark" style={{background:"#13795b",fontFamily:"Roboto"}}>
{/* <nav className="navbar navbar-expand-lg navbar-dark text-center" style={{background:"#563d7c",fontFamily:"Roboto"}}> */}
  <div className="container-fluid">
  <img className="navbar-brand" src={imageUrl} alt="Celebrate With Me" style={{
    height: '50px',
    border: '2px solid green',
    borderRadius: '16px', 
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  }} />
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" style={{cursor:"pointer"}} aria-current="page"  onClick={() => {setShow(false); navigate("/")}}>Home</a>
        </li>

        {!isAuthenticated && !isAdmin && !isAuthenticatedUser &&  <li className="nav-item dropdown">
 
          <button class="btn btn-primary ms-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">Vendor Registeration</button>

          <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Vendor Registeration</h5>
         <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
         </div>
          <div class="offcanvas-body">
            <li className="dropdown-item" onClick={()=> { setShow(true); navigate("/registerVenue") }}>Venue Registration</li>
            <li className="dropdown-item" onClick={()=> { setShow(true); navigate("/registerDJ") }}>DJ Registration</li>
            <li className="dropdown-item" onClick={()=> { setShow(true); navigate("/registerCater") }}>Cater Registration</li>
            <li className="dropdown-item" onClick={()=> { setShow(true); navigate("/registerPhotographer") }}>Photographer Registration</li>
  </div>
</div>
        </li>
        }
       <li className="nav-link active ms-2" style={{cursor:"pointer"}} onClick={()=> { setShow(true); navigate("/aboutus") }}>About Us</li>
        <li className="nav-link active ms-2" style={{cursor:"pointer"}} onClick={()=> { setShow(true); navigate("/contactus") }}>Contact Us</li>
        {isAuthenticated && isAdmin && <li className="nav-link active ms-2" style={{cursor:"pointer"}} onClick={()=> { setShow(true); navigate("/admin") }}>Admin</li>}
        </ul>
      <div>
       {!isAuthenticated && !isAdmin && isAuthenticatedUser &&  <button className="btn btn-success me-2 border- border-success shadow-sm " type="button" style={{fontFamily:"roboto",background:"none",border:"none"}} onClick={() => cartLength ? navigate("/cartnew") : navigate("/")}><i className="bi bi-cart-plus"><span style={{color:"white",fontWeight:"bold",marginLeft:"5px",fontSize:"20px"}}>{(cartLength !== null )?cartLength:0}</span></i></button>}
       {!isAuthenticated && !isAdmin && !isAuthenticatedUser &&  <button className="btn btn-success me-2 border- border-success shadow-sm" type="button" style={{fontFamily:"roboto"}} onClick={() => { setShowDateModal(true);}}>Login</button>}
       {!isAuthenticated && !isAdmin &&  isAuthenticatedUser &&  <button className="btn btn-success me-2 border- border-success shadow-sm" type="button" style={{fontFamily:"roboto"}} onClick={() => { dispatch({type:"logoutUser"}) }}>    {userName && (
        <span>{`${userName} | `}</span>
    )} Logout</button>}
       {/* {!isAuthenticated && !isAdmin &&  isAuthenticatedUser &&  <button className="btn btn-success me-2" type="button" style={{fontFamily:"roboto"}} onClick={() => { dispatch({type:"logoutUser",type:"removeUserID"}) }}><span>{userName} | </span> Sign out</button>} */}
       {!isAuthenticated && !isAdmin && !isAuthenticatedUser &&  <button className="btn btn-success border-1 border-success shadow-lg" type="button" style={{fontFamily:"roboto"}} onClick={() => { setShowDateModal1(true) }}>SignUp</button>}

      </div>
    </div>
  </div>
  {!isAuthenticatedUser && <ModalComponent
    show={showDateModal}
    width={"45%"}
    marginTop={"17%"} 
    modalBody={<SignIn handleClose={() => setShowDateModal(false)} handleEmail={handleEmail} />} />}
  <ModalComponent
    show={showDateModal1}
    width={"45%"}
    marginTop={"17%"}
    bgShadowPoint={"1"} 
    modalBody={<SignUp handleClose={() => setShowDateModal1(false)} />}/>  
</nav>
</>
  );
};

export default Header;
