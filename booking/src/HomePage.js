import React from 'react';

const HomePage = () => {
  return (
    <>
      <div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className="active" aria-current="true"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="3" aria-label="Slide 4"></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item">
            <img
              className="img-fluid"
              src="https://images.unsplash.com/photo-1614962249745-79360072bd86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt=""
            />
            <div className="container">
              <div className="carousel-caption text-start">
              <h1>Welcome to Our Photography Studio</h1>
<p>Explore our stunning portfolio and capture life's moments with us.</p>
{/* <p><a className="btn btn-lg btn-primary" href="#">Book a Session</a></p> */}

              </div>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              className="img-fluid"
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt=""
            />
            <div className="container">
              <div className="carousel-caption">
              <h1>DJ Services That Move You</h1>
<p>Feel the rhythm with our top-notch DJ entertainment services.</p>
{/* <p><a className="btn btn-lg btn-primary" href="#">Check Availability</a></p> */}

              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="img-fluid"
              src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1921&q=80"
              alt=""
            />
            <div className="container">
              <div className="carousel-caption text-end ">
              <h1>Catering Excellence for Your Event</h1>
<p>Indulge in delicious culinary creations for your special occasion.</p>
{/* <p><a className="btn btn-lg btn-primary" href="#">View Menu</a></p> */}

              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img
              className="img-fluid"
              src="https://images.unsplash.com/photo-1630764883473-e8c2056f0589?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
              alt=""
            />
            <div className="container">
              <div className="carousel-caption text-end">
              <h1>Elegant Venues for Memorable Gatherings</h1>
<p>Discover our exquisite venues to host your unforgettable events.</p>
{/* <p><a className="btn btn-lg btn-primary" href="#">Explore Venues</a></p> */}

              </div>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default HomePage;
