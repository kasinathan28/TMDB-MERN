import React from "react";
import "./Index.css";
import "./Index.css";
import wave from "../../assets/wave2.png";

function TrendingTVShows({ trendingTVShows, handleDetails }) {
  return (
    <div className="trend">
      <div className="label">
        <h2>Trending TV Shows:</h2>
      </div>
      <div className="cardctn">
        <div className="cardctnbg">
          <img src={wave} alt="wave" />
        </div>
        {trendingTVShows.map((tvShow, index) => (
          <div key={index} className="card">
            <img
              src={`${process.env.REACT_APP_POSTERURL}${tvShow.poster_path}`}
              alt={`${tvShow.name}`}
              onClick={() => handleDetails(tvShow.media_type, tvShow.id)}
            />
            <div className="desc">
              <p>{tvShow.name}</p>
              <p>{tvShow.first_air_date}</p>
            </div>
            <div className="rating">{tvShow.vote_average.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrendingTVShows;
