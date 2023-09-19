import React from "react";


const Footer = () => {
  return (
<>
<div class="row text-center mt-4 mb-2 justify-content-center p-2 text-white" style={{fontFamily:"roboto",background:"#240742"}}>
<div class="col-lg-3 mt-2">
  <img src="https://t3.ftcdn.net/jpg/01/10/11/00/360_F_110110063_4kxHX5YKcqrKqFz9udsaqmjkTCoOhKHc.jpg" alt="DJ Image" width="140" height="140" class="bd-placeholder-img rounded-circle" />
  <h2>Book Your DJ</h2>
  <p>Hire our talented DJs to bring the perfect beats to your event and get the party started.</p>
  {/* <p><a class="btn btn-secondary" href="#">View DJ details »</a></p> */}
</div>

<div class="col-lg-3 mt-2">
  <img src="https://etimg.etb2bimg.com/photo/87182640.cms" alt="Venue Image" width="140" height="140" class="bd-placeholder-img rounded-circle" />
  <h2>Book Your Venue</h2>
  <p>Discover stunning venues that set the stage for unforgettable gatherings and celebrations.</p>
  {/* <p><a class="btn btn-secondary" href="#">View Venue details »</a></p> */}
</div>

<div class="col-lg-3 mt-2">
  <img src="https://5.imimg.com/data5/SELLER/Default/2023/1/ZF/OO/GH/99007434/catering-services-for-delhi-ncr.jpg" alt="Catering Image" width="140" height="140" class="bd-placeholder-img rounded-circle" />
  <h2>Book Your Cater</h2>
  <p>Indulge in exquisite catering services, perfecting the flavors for your special occasion.</p>
  {/* <p><a class="btn btn-secondary" href="#">View Catering details »</a></p> */}
</div>

<div class="col-lg-3 mt-2">
  <img src="https://www.all-about-photo.com/images/articles/ART-913-2.jpg" alt="Photographer Image" width="140" height="140" class="bd-placeholder-img rounded-circle" />
  <h2>Book Your Photographer</h2>
  <p>Capture the moments that matter with our skilled photographers, preserving memories for a lifetime.</p>
  {/* <p><a class="btn btn-secondary" href="#">View Photographer details »</a></p> */}
</div>
<div class="row p-2" style={{background:"#19052e"}}>
  <div class="col-12 mt-2">
    <p>&copy; All rights reserved</p>
  </div>
</div>


</div>
</>
  );
};

export default Footer;
