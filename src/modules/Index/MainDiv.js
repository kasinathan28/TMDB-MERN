import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import wave from "../../assets/wave2.png";
import "./Index.css";

function MainDiv({ movies, randomIndex, setRandomIndex, searchQuery, setSearchQuery, handleSearch, searchInputRef, navigate, loading }) {
  // Function to get a random index within the movies array length
  const getRandomIndex = () => Math.floor(Math.random() * movies.length);

  // Set randomIndex with a random value when the component mounts
  useEffect(() => {
    setRandomIndex(getRandomIndex());
  }, []);

  // Update randomIndex when movies change
  useEffect(() => {
    if (movies.length > 0) {
      setRandomIndex(getRandomIndex());
    }
  }, [movies]);

  return (
    <div>
      <div className="main">
        {randomIndex !== null && (
          <img
            src={`${process.env.REACT_APP_BACKDROP}${movies[randomIndex]?.backdrop_path}`}
            className="bgimg"
            alt={`${movies[randomIndex]?.title}`}
          />
        )}

        <div className="message">
          <h1>Welcome</h1>
          <h2>Millions of Movies, TV Shows, and People To Discover.</h2>
        </div>
        <div className="search">
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Movies, TV Shows, Person...."
            ref={searchInputRef}
            autoFocus={false}
          />

          <button onClick={handleSearch}>Search</button>
        </div>
        <div>
          <img src={wave} alt="wave" className="wave" />
        </div>
      </div>
    </div>
  );
}

export default MainDiv;
