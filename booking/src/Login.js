import React,{useState} from 'react';

function Login({ handleClose}) {

    const [showPass, setshowPass] = useState(false);

    const togglePasswordVisibility = () => {
      setshowPass(!showPass);
    };
  
  const cardStyle = {
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#f9f9f9',
  };

  const inputStyle = {
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    transition: 'background-color 0.3s ease',
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };
  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={cardStyle}>
            <div className="card-body">
            <button
                type="button"
                className="btn-close"
                aria-label="Close"
                style={closeButtonStyle}
                onClick={()=> handleClose()}
              ></button>
              <h5 className="card-title text-center">Login</h5>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <p htmlFor="username" className="form-label text-start">Username</p>
                  <input type="text" className="form-control" id="username" placeholder="Enter your username" style={inputStyle} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <div className="input-group">
                    <input
                      type={showPass ? "text" : "password"}
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={togglePasswordVisibility}
                    >
                      <i className={`fas ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-block " style={buttonStyle}>Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
