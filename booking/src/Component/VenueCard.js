import React,{useState} from "react";
import VenueBookingB5 from "./VenueBookingB5";
import ModalComp from "./ModalComp";

const VenueCard = ({ user }) => {
  const [showDateModal, setShowDateModal] = useState(false);


    console.log(user);
    const accordionId = `accordion-${user._id}`; // Generate a unique ID

    return (
        <div className="card" style={{ width: "18rem", boxShadow: "1px 1px 12px -5px black", border: '1px solid #e0e0e0',}}>
            <img src={`http://localhost:8000/images/${user.path}`} className="card-img-top img-fluid" alt="Venue" style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
            <div className="card-body">
                <h5 className="card-title" style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "10px", color: "#333" }}>
                    {user.VenueName}</h5>
                <p className="card-text" style={{ color: "#555", marginBottom: '15px' }}>Location: {user.VenueLocation}</p>
                <button type="button" class="btn btn-primary" onClick={()=>setShowDateModal(true)}>View More</button>
               
    </div>
    <ModalComp
        show={showDateModal}
        width={"80%"}
        modalBody={<VenueBookingB5 handleClose={() => setShowDateModal(false)} />}
      ></ModalComp>
</div>
    );
};

export default VenueCard;
