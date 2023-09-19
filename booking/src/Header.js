import React from "react";

const headerStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  padding: "10px 0",
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  margin: "0 10px",
};

const Header = () => {
  return (
<>
<nav className="navbar navbar-expand-lg navbar-dark text-center" style={{background:"#240742",fontFamily:"Roboto"}}>
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Services
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li><a className="dropdown-item" href="#">Venue Booking</a></li>
            <li><a className="dropdown-item" href="#">Photographer Booking</a></li>
            {/* <li><hr className="dropdown-divider" /></li> */}
            <li><a className="dropdown-item" href="#">DJ Booking</a></li>
            <li><a className="dropdown-item" href="#">Cater Booking</a></li>

          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">About Us</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Contact Us</a>
        </li>
        </ul>
      <div>
        {/* <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" /> */}
        <button className="btn btn-success" type="submit">Login</button>
      </div>
    </div>
  </div>
</nav>
</>
  );
};

export default Header;
