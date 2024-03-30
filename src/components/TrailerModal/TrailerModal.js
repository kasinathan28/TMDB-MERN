import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import "./TrailerModal.css";

function TrailerModal({ trailer, onClose }) {
  const [loading, setLoading] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleReady = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
  };

  return (
    <div className="modal">
      <button className="close-btn" onClick={onClose}>
        X
      </button>
      {loading && (
        <div className="loader-container1">
          <div className="loader1"></div>
        </div>
      )}
      {trailer && (
        <ReactPlayer
          url={trailer}
          controls
          width={isSmallScreen ? 400 : 1100}
          height={isSmallScreen ? 200 : 600}
          onReady={handleReady}
          onError={handleError}
        />
      )}
    </div>
  );
}

export default TrailerModal;