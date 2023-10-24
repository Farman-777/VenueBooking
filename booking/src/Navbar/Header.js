import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import ModalComponent from "../ModalComponent";
import SignIn from './SignIn'
import SignUp from "./SignUp";
import { useSelector } from "react-redux";
// import CartNew from '../CartNew'
// import CartItem from "./CartItem";


const Header = ({setShow,cartLength}) => {
  const navigate = useNavigate();
  console.log(cartLength)
  const [showDateModal,setShowDateModal] = useState(false)
  const [showDateModal1,setShowDateModal1] = useState(false)
  const [Sign,setSign] = useState({
    in:"SignIn",
    out:"SignOut"
  })
const {isAuthenticated} = useSelector(state => state.root)
return (
<>
<nav className="navbar navbar-expand-lg navbar-dark text-center" style={{background:"#240742",fontFamily:"Roboto"}}>
  <div className="container-fluid">
    <a className="navbar-brand">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" style={{cursor:"pointer"}} aria-current="page"  onClick={() => {setShow(false); navigate("/")}}>Home</a>
        </li>

        {!isAuthenticated && <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Vendor Registration
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li className="dropdown-item" onClick={()=> { setShow(true); navigate("/registerVenue") }}>Venue Registration</li>
            <li className="dropdown-item" onClick={()=> { setShow(true); navigate("/registerDJ") }}>DJ Registration</li>
            <li className="dropdown-item" onClick={()=> { setShow(true); navigate("/registerCater") }}>Cater Registration</li>
            <li className="dropdown-item" onClick={()=> { setShow(true); navigate("/registerPhotographer") }}>Photographer Registration</li>

          </ul>
        </li>}
        <li className="nav-link active" style={{cursor:"pointer"}} onClick={()=> { setShow(true); navigate("/aboutus") }}>About Us</li>
        <li className="nav-link active" style={{cursor:"pointer"}} onClick={()=> { setShow(true); navigate("/contactus") }}>Contact Us</li>
        <li className="nav-link active" style={{cursor:"pointer"}} onClick={()=> { setShow(true); navigate("/admin") }}>Admin</li>
        </ul>
      <div>
       {!isAuthenticated && <button className="btn btn-success me-2 " type="button" style={{fontFamily:"roboto",background:"none",border:"none"}} onClick={() => cartLength ? navigate("/cartnew") : navigate("/")}><i className="bi bi-cart-plus"><span style={{color:"white",fontWeight:"bold",marginLeft:"5px",fontSize:"20px"}}>{(cartLength !== null )?cartLength:0}</span></i></button>}
       {!isAuthenticated && <button className="btn btn-success me-2" type="button" style={{fontFamily:"roboto"}} onClick={() => { setShowDateModal(true); }}>SignIn</button>}
       {!isAuthenticated && <button className="btn btn-success" type="button" style={{fontFamily:"roboto"}} onClick={() => { setShowDateModal1(true) }}>SignUp</button>}
      </div>
    </div>
  </div>
  <ModalComponent
    show={showDateModal}
    width={"45%"}
    marginTop={"17%"} 
    modalBody={<SignIn handleClose={() => setShowDateModal(false)} />} />
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
