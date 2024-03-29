import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Loader from "../../components/Loader/Loader";
import "./Details.css";
import axios from "axios";
import { FaList, FaHeart, FaSave, FaPlay } from "react-icons/fa";

function Details() {
  const { id, mediaType } = useParams();

  const TOKEN = `${process.env.REACT_APP_TOKEN}`;
  const BACKDROP = `${process.env.REACT_APP_BACKDROP}`;
  const PERSON = `${process.env.REACT_APP_PERSON}`;
  const BASEURL = `${process.env.REACT_APP_BASEURL}`;
  const [details, setDetails] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [cast, setCast] = useState([]);
  const POSTERURL = `${process.env.REACT_APP_POSTERURL}`;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        let response;
        if (mediaType === "person") {
          response = await axios.get(`${PERSON}${id}`, {
            headers: {
              accept: "application/json",
              Authorization: `${TOKEN}`,
            },
          });
        } else {
          response = await axios.get(`${BASEURL}${mediaType}/${id}`, {
            headers: {
              accept: "application/json",
              Authorization: `${TOKEN}`,
            },
          });

          const creditsResponse = await axios.get(`${BASEURL}${mediaType}/${id}/credits`, {
            headers: {
              accept: "application/json",
              Authorization: `${TOKEN}`,
            },
          });
          
          setCast(creditsResponse.data.cast);
        }
        setDetails(response.data);
      } catch (error) {
        console.log("Error while fetching the details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id, mediaType, TOKEN]);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleReadMore = () => {
    setShowFullOverview(true);
  };

  const handleDetails = (mediaType, id) => {
    navigate(`/details/${mediaType}/${id}`);
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

      <div>
        {loading ? (
          <Loader />
        ) : (
          <div className="detailsPage">
            {details && (
              <div
                className={`Detailsbg ${
                  mediaType === "person" && !isLargeScreen ? "hideBackdrop" : ""
                }`}
              >
                {!(!isLargeScreen && mediaType === "person") && (
                  <img
                    src={`${BACKDROP}${
                      details.profile_path || details.backdrop_path
                    }`}
                    alt="Backdrop"
                    className="backdrop-image"
                  />
                )}
                <div className="center">
                  <div className="poster">
                    <img
                      src={`${POSTERURL}${
                        details.profile_path || details.poster_path
                      }`}
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
                    {mediaType === "person" ? (
                      <>
                        <p>Birthday: {details.birthday}</p>
                        <p>Place of Birth: {details.place_of_birth}</p>
                        <p>Popularity: {details.popularity}</p>
                        <div className="biography">
                          <h2>Biography</h2>
                          <p>
                            {showFullOverview
                              ? details.biography // Check if details.biography exists before accessing it
                              : details.biography?.substring(0, 200) ??
                                "Biography not available"}{" "}
                            {/* Use optional chaining and nullish coalescing */}
                          </p>

                          {!showFullOverview && (
                            <a
                              className="biographybtn"
                              onClick={handleReadMore}
                            >
                              Read More
                            </a>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        {details && details.genres && (
                          <div className="genre">
                            {details.genres.map((genre, index) => (
                              <p key={index}>{genre.name}</p>
                            ))}
                          </div>
                        )}

                        {mediaType === "tv" && details && (
                          <div>
                            <p>Number of Seasons: {details.number_of_seasons}</p>
                            <p>Number of Episodes: {details.number_of_episodes}</p>
                            {details.last_episode_to_air && (
                              <div>
                                <p>Last Episode Aired: {details.last_episode_to_air.name}</p>
                                <p>Last Episode Overview: {details.last_episode_to_air.overview}</p>
                              </div>
                            )}
                          </div>
                        )}

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

            {mediaType !=="person" && (
              <div>
                <div className="trendingPeople">
                  <div className="trendingPeopleCards">
                    {cast &&
                      cast.map((cast) => (
                        <div
                          key={cast.id}
                          className="trendingPeopleCard"
                          onClick={() => handleDetails("person", cast.id)}
                        >
                          <img
                            src={`${POSTERURL}${cast.profile_path}`}
                            alt={cast.name}
                          />
                          <div className="personname">
                            <p>{cast.name}</p>
                            <div className="popularity">
                              {`${cast.popularity.toFixed(2)}`}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Details;