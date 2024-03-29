import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Details.css";
import axios from "axios";
import { FaList, FaHeart, FaSave, FaPlay } from "react-icons/fa";

function Details() {
  const { id, mediaType } = useParams();

  const TOKEN = `${process.env.REACT_APP_TOKEN}`;
  const BACKDROP = `${process.env.REACT_APP_BACKDROP}`;
  const [details, setDetails] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const POSTERURL = `${process.env.REACT_APP_POSTERURL}`;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        let response;
        if (mediaType === 'person') {
          response = await axios.get(
            `https://api.themoviedb.org/3/person/${id}`,
            {
              headers: {
                accept: "application/json",
                Authorization: `${TOKEN}`,
              },
            }
          );
        } else {
          response = await axios.get(
            `https://api.themoviedb.org/3/movie/${id}`,
            {
              headers: {
                accept: "application/json",
                Authorization: `${TOKEN}`,
              },
            }
          );
        }
        setDetails(response.data);
      } catch (error) {
        console.log("Error while fetching the details", error);
      }
    };
    fetchDetails();
  }, [id, mediaType, TOKEN]);
  

  const handleReadMore = () => {
    setShowFullOverview(true);
  };

  const calculateBorderStyle = () => {
    if (details && details.vote_average) {
      const score = details.vote_average * 10;
      if (score >= 70) {
        return { color: "green", width: "4px" };
      } else if (score >= 50) {
        return { color: "yellow", width: "3px" };
      } else {
        return { color: "red", width: "2px" };
      }
    }
    return { color: "yellow", width: "3px" };
  };

  return (
    <div>
      <Navbar />
      <div className="detailsPage">
        {details && (
          <div className="Detailsbg">
            <img
              src={`${BACKDROP}${details.profile_path || details.backdrop_path}`}
              alt="Backdrop"
              className="backdrop-image" 
            />
            <div className="center">
              <div className="poster">
                <img
                  src={`${POSTERURL}${details.profile_path || details.poster_path}`}
                  alt={`${details.name || details.title}`}
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
                <h1>{`${details.name || details.title}`}</h1>
                {mediaType === 'person' ? (
                  <>
                    <p>Birthday: {details.birthday}</p>
                    <p>Place of Birth: {details.place_of_birth}</p>
                    <p>Popularity: {details.popularity}</p>
                    <div className="biography">
                      <h2>Biography</h2>
                      <p>
                        {showFullOverview
                          ? details.biography
                          : `${details.biography.substring(0, 200)}...`}
                      </p>
                      {!showFullOverview && (
                        <button onClick={handleReadMore}>Read More</button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="genre">
                      {details.genres.map((genre, index) => (
                        <p key={index}>{genre.name}</p>
                      ))}
                    </div>
                    <div className="rating">
                      <button
                        style={{
                          borderColor: calculateBorderStyle().color,
                          borderWidth: calculateBorderStyle().width,
                        }}
                      >
                        {(details.vote_average * 10).toFixed(2)}%
                      </button>
                      <span>User Score</span>
                    </div>
                    <div className="over">
                      <h2>Overview</h2>
                      <p>{`${details.overview}`}</p>
                    </div>
                  </>
                )}
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
