// TrailerModal.js
import React from "react";
import ReactPlayer from "react-player";
import "./TrailerModal.css";

function TrailerModal({ trailer, onClose }) {
  return (
    <div className="modal">
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
      <div className="modal-content">
        {trailer && (
          <ReactPlayer
            url={trailer}
            controls
            wrapper={(props) => <div {...props} className="react-player" />} 
            height={500}
            width={900}
          />
        )}
      </div>
    </div>
  );
}

export default TrailerModal;
