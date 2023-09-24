import React, { useEffect, useState } from "react";

const ModalCompThree = ({
  modalBody,
  modalFooter,
  width,
  style,
  show,
  ...other
}) => {
  const [modalStyle, setModalStyle] = useState({
    display: show ? "block" : "none",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  });

  useEffect(() => {
    setModalStyle({
      display: show ? "block" : "none",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    });
  }, [show]);

  return (
    <div className="modal" tabIndex="-1" role="dialog" style={modalStyle}>
      <div
        className="modal-dialog"
        role="document"
        style={{ maxWidth: width }}
        {...other}
      >
        <div className="modal-content" style={{marginTop:"6%"}}>
          <div className="modal-body">{modalBody}</div>
          {/* <div className="modal-footer">{modalFooter}</div> */}
        </div>
      </div>
    </div>
  );
};

export default ModalCompThree;

/*
        <div className="modal-content">
          <div className="modal-header">
          <h5 className="modal-title">Select Date</h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
          </div> 
          <div className="modal-body">{modalBody}</div>
          <div className="modal-footer">{modalFooter}</div>
        </div>
*/
