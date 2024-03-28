import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Details.css";
import axios from "axios";
import { FaList, FaHeart, FaSave, FaPlay } from "react-icons/fa";

function Details() {
  const { id } = useParams();
  const TOKEN = `${process.env.REACT_APP_TOKEN}`;
  const BACKDROP = `${process.env.REACT_APP_BACKDROP}`;
  const [movieDetails, setMovieDetails] = useState(null);
  const POSTERURL = `${process.env.REACT_APP_POSTERURL}`;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `${TOKEN}`,
            },
          }
        );
        setMovieDetails(response.data);
      } catch (error) {
        console.log("Error while fetching the details", error);
      }
    };
    fetchDetails();
  }, [id, TOKEN]);

  const calculateBorderStyle = () => {
    if (movieDetails && movieDetails.vote_average) {
      const score = movieDetails.vote_average * 10; // Convert to percentage
      if (score >= 70) {
        return { color: "green", width: "4px" }; // Green border for high score
      } else if (score >= 50) {
        return { color: "yellow", width: "3px" }; // Yellow border for medium score
      } else {
        return { color: "red", width: "2px" }; // Red border for low score
      }
    }
    return { color: "yellow", width: "3px" }; // Default color and width
  };

  return (
    <div>
      <Navbar />
      <div className="detailsPage">
        {movieDetails && (
          <div className="Detailsbg">
            <img
              src={`${BACKDROP}${movieDetails.backdrop_path}`}
              alt="Backdrop"
              className="backdrop-image"
            />
            <div className="center">
              <div className="poster">
                <img
                  src={`${POSTERURL}${movieDetails.poster_path}`}
                  alt={`${movieDetails.title}`}
                />
                <div className="buttons">
                  <button>
                    <FaList />
                  </button>
                  <button>
                    <FaHeart />
                  </button>
                  <button>
                    <FaSave />
                  </button>
                  <button>
                    <FaPlay />
                  </button>
                </div>
              </div>
              <div className="overview">
                <h1>{`${movieDetails.title}`}</h1>
                <div className="rating">
                  <button
                    style={{
                      borderColor: calculateBorderStyle().color,
                      borderWidth: calculateBorderStyle().width,
                    }}
                  >
                    {(movieDetails.vote_average * 10).toFixed(2)}%
                  </button>

                  <span>User Score</span>
                </div>
                <p>{`${movieDetails.overview}`}</p>
                <div className="buttons">
                  <button>
                    <FaList />
                  </button>
                  <button>
                    <FaHeart />
                  </button>
                  <button>
                    <FaSave />
                  </button>
                  <button>
                    <FaPlay />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;
