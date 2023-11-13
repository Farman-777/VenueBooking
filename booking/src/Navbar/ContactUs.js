import axios from "axios";
import React, { useState } from "react";
import Confetti from "react-confetti";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const ContactUs = () => {
  const {isAuthenticated, isAdmin,isAuthenticatedUser } = useSelector(state => state.root)
  console.log("Contact Us page isAuthenticatedUser",isAuthenticatedUser);
  const [showConfetti, setShowConfetti] = useState(false);
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [message,setMessage] = useState('')

const handleName = (e) => { setName(e.target.value); }
const handleEmail = (e) => { setEmail(e.target.value); }
const handleMessage = (e) => { setMessage(e.target.value); }

const handleFormSubmit = (e) => {
  e.preventDefault();

  if(isAuthenticatedUser === false){
    Swal.fire({
      icon: "warning",
      title: "Please Login First",
      text: ""
    });
    return
  }

  // Assuming name, email, and message are defined somewhere in your component state
  const formObj = {
    Name: name,
    Email: email,
    Message: message,
  };

  console.log("contactForm", formObj);

  axios.post("http://localhost:8005/contactForm", formObj)
    .then(result => {
      if (result.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Thanks for contacting us!",
          text: "We'll get back to you shortly.",
        });
        setName("");
        setEmail("");
        setMessage("");
      }
    })
    .catch(error => {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong!",
        text: error.message,
      });
    });

  // Show the confetti animation
  setShowConfetti(true);

  // Reset the confetti animation after a few seconds (10 seconds in this example)
  setTimeout(() => {
    setShowConfetti(false);
  }, 10000);
};


  return (
    <div className="container mt-5 pt-2 pb-2" style={{ background: "#eee", color: "#333" }}>
      {showConfetti && <Confetti />}
      <div className="card p-5" style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "10px", background: "#444", color: "#fff" }}>
        <h2 style={{ color: "#fff" }}>Contact Us</h2>
        <p>If you have any questions or feedback, please feel free to contact us.</p>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" style={{ background: "#fff", color: "#333" }}  value={name} onChange={handleName} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" style={{ background: "#fff", color: "#333" }}  value={email} onChange={handleEmail} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea className="form-control" id="message" rows="4" style={{ background: "#fff", color: "#333" }}  value={message} onChange={handleMessage} required/>
          </div>
          {isAuthenticatedUser ? <button type="submit" className="btn btn-primary" style={{ background: "#007bff", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
            Submit
          </button> : <button className="btn btn-danger">Please Login </button>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;



// import React, { useState } from "react";
// import Confetti from "react-confetti";
// import Swal from "sweetalert2";

// const ContactUs = () => {
//   const [showConfetti, setShowConfetti] = useState(false);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     // Process your form submission here

//     // Show the confetti animation
//     setShowConfetti(true);

//     // Display a "Thanks" alert using SweetAlert
//     Swal.fire({
//       icon: "success",
//       title: "Thanks for contacting us!",
//       text: "We'll get back to you shortly.",
//     });

//     // Reset the confetti animation after a few seconds (5 seconds in this example)
//     setTimeout(() => {
//       setShowConfetti(false);
//     }, 10000);
//   };

//   return (
//     <div className="container mt-5">
//       {showConfetti && <Confetti />}
//       <div className="card p-5" style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "10px", background: "#fff" }}>
//         <h2 style={{ color: "#333" }}>Contact Us</h2>
//         <p>If you have any questions or feedback, please feel free to contact us.</p>
//         <form onSubmit={handleFormSubmit}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label">
//               Name
//             </label>
//             <input type="text" className="form-control" id="name" />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label">
//               Email
//             </label>
//             <input type="email" className="form-control" id="email" />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="message" className="form-label">
//               Message
//             </label>
//             <textarea className="form-control" id="message" rows="4"></textarea>
//           </div>
//           <button type="submit" className="btn btn-primary" style={{ background: "#007bff", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;
