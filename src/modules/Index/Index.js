import React, { useEffect, useState } from "react";
import "./Index.css";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import wave from "../../assets/wave2.png";
import bg from "../../assets/bg.png";

function Index() {
  const [movies, setMovies] = useState([]);
  const [randomIndex, setRandomIndex] = useState(null);
  const [activeItem, setActiveItem] = useState("Today");


  const TOKEN = `${process.env.REACT_APP_TOKEN}`;
  const BASEURL = `${process.env.REACT_APP_BASEURL}`;
  const POSTERURL = `${process.env.REACT_APP_POSTERURL}`;
  const BACKDROP = `${process.env.REACT_APP_BACKDROP}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}trending/movie/day?language=en-US`,
          {
            headers: {
              accept: "application/json",
              Authorization: `${TOKEN}`,
            },
          }
        );
        setMovies(response.data.results.slice(0, 15)); 
        setRandomIndex(Math.floor(Math.random() * response.data.results.length)); // Generate a random index
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="index" >
      <Navbar />
      <div className="main">
      <img src={`${BACKDROP}${movies[randomIndex]?.backdrop_path}`} className="bgimg" />
        <div className="message">
          <h1>Welcome</h1>
          <h2>Millions of Movies, TV Shows, and People To Discover.</h2>
        </div>
        <div className="search">
          <input type="text" id="search" />
          <button>Search</button>
        </div>
        <div>
          <img src={wave} alt="wave" className="wave" />
        </div>
      </div>

      <div className="trend">
        <div className="label">
          <h2>Trending:</h2>
         <ul>
            <li className={activeItem === "Today" ? "active" : ""} onClick={() => setActiveItem("Today")}>Today</li>
            <li className={activeItem === "This Week" ? "active" : ""} onClick={() => setActiveItem("This Week")}>This Week</li>
          </ul>
        </div>
      </div>

      <div className="cardctn">
        <div className="cardctnbg">
          <img src={wave} alt="wave" />
        </div>
        {movies.map((movie, index) => (
          <div key={index} className="card">
            <img
              src={`${POSTERURL}${movie.poster_path}`}
              alt={`${movie.title}`}
            />
            <div className="desc">
              <p>{movie.title}</p>
              <p>{movie.release_date}</p>
            </div>
            <div className="rating">{movie.vote_average}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Index;
