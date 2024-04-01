import React from "react";
import "./Index.css";
import wave from "../../assets/wave2.png";

function TrendingMovies({ movies, handleDetails, activeItem, setActiveItem }) {
  return (
    <div className="trend">
      <div className="label">
        <h2>Trending Movies:</h2>
        <ul>
          <li
            className={activeItem === "Today" ? "active" : ""}
            onClick={() => setActiveItem("Today")}
          >
            Today
          </li>
          <li
            className={activeItem === "This Week" ? "active" : ""}
            onClick={() => setActiveItem("This Week")}
          >
            This Week
          </li>
        </ul>
      </div>
      <div className="cardctn">
        <div className="cardctnbg">
          <img src={wave} alt="wave" />
        </div>
        {movies.map((movie, index) => (
          <div key={index} className="card">
            <img
              src={`${process.env.REACT_APP_POSTERURL}${movie.poster_path}`}
              alt={`${movie.title}`}
              onClick={() => handleDetails(movie.media_type, movie.id)}
            />
            <div className="desc">
              <p>{movie.title}</p>
              <p>{movie.release_date}</p>
            </div>
            <div className="rating">
              {movie.vote_average.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingMovies;
