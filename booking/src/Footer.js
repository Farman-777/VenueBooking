import React from "react";
import { FaHeadphones, FaMapMarkerAlt, FaUtensils, FaCamera } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <div className="row  mt-4 m-2 p-4 text-white" style={{ fontFamily: "roboto", background: "#13795b" }} >
        <div className="col-lg-3 mt-2 border-1 border-success shadow-lg text-center p-2">
          <FaHeadphones size={140} className="bd-placeholder-img rounded-circle text-center mx-auto" />
          <h2>Book Your DJ</h2>
          <p>Hire our talented DJs to bring the perfect beats to your event and get the party started.</p>
        </div>

        <div className="col-lg-3 mt-2 border-1 border-success shadow-lg text-center  p-2">
          <FaMapMarkerAlt size={140} className="bd-placeholder-img rounded-circle mx-auto" />
          <h2>Book Your Venue</h2>
          <p>Discover stunning venues that set the stage for unforgettable gatherings and celebrations.</p>
        </div>

        <div className="col-lg-3 mt-2 border-1 border-success shadow-lg text-center  p-2">
          <FaUtensils size={140} className="bd-placeholder-img rounded-circle mx-auto" />
          <h2>Book Your Cater</h2>
          <p>Indulge in exquisite catering services, perfecting the flavors for your special occasion.</p>
        </div>

        <div className="col-lg-3 mt-2 border-1 border-success shadow-lg text-center  p-2">
          <FaCamera size={140} className="bd-placeholder-img rounded-circle mx-auto" />
          <h2>Book Your Photographer</h2>
          <p>Capture the moments that matter with our skilled photographers, preserving memories for a lifetime.</p>
        </div>
          <div className="bg-dark text-center mt-3"> <p className="mt-3">&copy; All rights reserved</p> </div>
      </div>
    </>
  );
};

export default Footer;


// import React from "react";

// const Footer = () => {
//   return (
//     <>
//       <div
//         class="row text-center mt-4 mb-2 justify-content-center p-2 text-white"
//         style={{ fontFamily: "roboto", background: "#13795b" }}
//       >
//         <div class="col-lg-3 mt-2">
//           <img
//             src="https://t3.ftcdn.net/jpg/01/10/11/00/360_F_110110063_4kxHX5YKcqrKqFz9udsaqmjkTCoOhKHc.jpg"
//             alt="DJ Image"
//             width="140"
//             height="140"
//             class="bd-placeholder-img rounded-circle"
//           />
//           <h2>Book Your DJ</h2>
//           <p>
//             Hire our talented DJs to bring the perfect beats to your event and
//             get the party started.
//           </p>
//         </div>

//         <div class="col-lg-3 mt-2">
//           <img
//             src="https://etimg.etb2bimg.com/photo/87182640.cms"
//             alt="Venue Image"
//             width="140"
//             height="140"
//             class="bd-placeholder-img rounded-circle"
//           />
//           <h2>Book Your Venue</h2>
//           <p>
//             Discover stunning venues that set the stage for unforgettable
//             gatherings and celebrations.
//           </p>
//         </div>

//         <div class="col-lg-3 mt-2">
//           <img
//             src="https://5.imimg.com/data5/SELLER/Default/2023/1/ZF/OO/GH/99007434/catering-services-for-delhi-ncr.jpg"
//             alt="Catering Image"
//             width="140"
//             height="140"
//             class="bd-placeholder-img rounded-circle"
//           />
//           <h2>Book Your Cater</h2>
//           <p>
//             Indulge in exquisite catering services, perfecting the flavors for
//             your special occasion.
//           </p>
//         </div>

//         <div class="col-lg-3 mt-2">
//           <img
//             src="https://www.all-about-photo.com/images/articles/ART-913-2.jpg"
//             alt="Photographer Image"
//             width="140"
//             height="140"
//             class="bd-placeholder-img rounded-circle"
//           />
//           <h2>Book Your Photographer</h2>
//           <p>
//             Capture the moments that matter with our skilled photographers,
//             preserving memories for a lifetime.
//           </p>
//         </div>
//         <div class="row p-2" style={{ background: "#19052e" }}>
//           <div class="col-12 mt-2">
//             <p>&copy; All rights reserved</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Footer;
