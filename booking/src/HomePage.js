import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ setShow }) => {
  const sectionStyle = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#f0f0f0', // Add your preferred background color
    padding: '20px',
  };

  const imageStyle = {
    maxWidth: '100%',
    height: 'auto',
  };

  const dividerStyle = {
    borderBottom: '1px solid #ccc',
    width: '80%',
    margin: '20px 0',
  };

  return (
    <>
      <div style={sectionStyle}>
        <h1>Elegant Venues for Memorable Gatherings</h1>
        <p>Discover our exquisite venues to host your unforgettable events.</p>
        <p> <Link to="/VenueMain" className="btn btn-lg btn-primary" onClick={() => setShow(true)}>See More</Link> </p>
        <img
          style={imageStyle}
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2098&q=80"
          alt=""/>
        <div style={dividerStyle}></div>
      </div>

      <div style={sectionStyle}>
        <h1>Catering Excellence for Your Event</h1>
        <p>Indulge in delicious culinary creations for your special occasion.</p>
        <p> <Link to="/CaterMain" className="btn btn-lg btn-primary" onClick={() => setShow(true)}>See More</Link> </p>
        <img
          style={imageStyle}
          src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1921&q=80"
          alt=""/>
        <div style={dividerStyle}></div>
      </div>

      <div style={sectionStyle}>
        <h1>DJ Services That Move You</h1>
        <p>Feel the rhythm with our top-notch DJ entertainment services.</p>
        <p> <Link to="/DJMain" className="btn btn-lg btn-primary" onClick={() => setShow(true)}>See More</Link> </p>
        <img
          style={imageStyle}
          src="https://images.unsplash.com/photo-1516873240891-4bf014598ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt=""/>
        <div style={dividerStyle}></div>
      </div>

      <div style={sectionStyle}>
        <h1>Welcome to Our Photography Studio</h1>
        <p>Explore our stunning portfolio and capture life's moments with us.</p>
        <p> <Link to="/PhotographerMain" className="btn btn-lg btn-primary" onClick={() => setShow(true)}>See More</Link> </p>
        <img
          style={imageStyle}
          src="https://images.unsplash.com/photo-1614962249745-79360072bd86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt=""/>
        <div style={dividerStyle}></div>
      </div>
    </>
  );
};

export default HomePage;







// import React from 'react';
// import { Link } from 'react-router-dom';

// const HomePage = ({setShow}) => {
  
//   return (
//     <>
//       <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
//         <div className="carousel-indicators">
//           <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" aria-label="Slide 1"></button>
//           <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className="active" aria-current="true"></button>
//           <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
//           <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
//         </div>
//         <div className="carousel-inner">
//           <div className="carousel-item">
//             <img
//               className="img-fluid"
//               src="https://images.unsplash.com/photo-1614962249745-79360072bd86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
//               alt=""
//             />
//             <div className="container">
//               <div className="carousel-caption text-start">
//               <h1>Welcome to Our Photography Studio</h1>
//               <p>Explore our stunning portfolio and capture life's moments with us.</p>
//               <p><Link to="/PhotographerMain" className="btn btn-lg btn-primary" onClick={() => setShow(true)}>See More</Link></p>

//               </div>
//             </div>
//           </div>
//           <div className="carousel-item active">
//             <img
//               className="img-fluid"
//               src="https://images.unsplash.com/photo-1516873240891-4bf014598ab4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
//               alt=""
//             />
//             <div className="container">
//               <div className="carousel-caption">
//               <h1>DJ Services That Move You</h1>
//               <p>Feel the rhythm with our top-notch DJ entertainment services.</p>
//               <p><Link to="/DJMain" className="btn btn-lg btn-primary" onClick={() => setShow(true)}>See More</Link></p>

//               </div>
//             </div>
//           </div>
//           <div className="carousel-item">
//             <img
//               className="img-fluid"
//               src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1921&q=80"
//               alt=""
//             />
//             <div className="container">
//               <div className="carousel-caption text-end ">
//               <h1>Catering Excellence for Your Event</h1>
//               <p>Indulge in delicious culinary creations for your special occasion.</p>
//               <p><Link to="/CaterMain" className="btn btn-lg btn-primary" onClick={() => setShow(true)}>See More</Link></p>

//               </div>
//             </div>
//           </div>
//           <div className="carousel-item">
//             <img
//               className="img-fluid"
//               src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2098&q=80"
//               alt=""
//             />
//             <div className="container">
//               <div className="carousel-caption text-end">
//               <h1>Elegant Venues for Memorable Gatherings</h1>
//               <p>Discover our exquisite venues to host your unforgettable events.</p>
//               <p><Link to="/VenueMain" className="btn btn-lg btn-primary" onClick={() => setShow(true)}>See More</Link></p>

//               </div>
//             </div>
//           </div>
//         </div>
//         <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
//           <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Previous</span>
//         </button>
//         <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
//           <span className="carousel-control-next-icon" aria-hidden="true"></span>
//           <span className="visually-hidden">Next</span>
//         </button>
//       </div>
//     </>
//   );
// };

// export default HomePage;
