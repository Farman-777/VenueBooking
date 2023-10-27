import React, { useState } from "react";
import Confetti from "react-confetti";
import Swal from "sweetalert2";

const ContactUs = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Process your form submission here

    // Show the confetti animation
    setShowConfetti(true);

    // Display a "Thanks" alert using SweetAlert
    Swal.fire({
      icon: "success",
      title: "Thanks for contacting us!",
      text: "We'll get back to you shortly.",
    });

    // Reset the confetti animation after a few seconds (5 seconds in this example)
    setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
  };

  return (
    <div className="container mt-5">
      {showConfetti && <Confetti />}
      <div className="card p-5" style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "10px", background: "#fff" }}>
        <h2 style={{ color: "#333" }}>Contact Us</h2>
        <p>If you have any questions or feedback, please feel free to contact us.</p>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea className="form-control" id="message" rows="4"></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ background: "#007bff", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
