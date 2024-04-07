import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Loader from "../../components/Loader/Loader";
import "./Details.css";
import { FaList, FaHeart, FaSave, FaPlay } from "react-icons/fa";
import NoAvatar from "../..//assets/No_avatar.png";
import TrailerModal from "../../components/TrailerModal/TrailerModal";
import {
  fetchDetails,
  fetchWatchProviders,
  getTrailer,
  handleWatch,
} from "../../Functions/api";

function Details() {
  const { id, mediaType } = useParams();
  const BASEURL = `${process.env.REACT_APP_BASEURL}`;
  const TOKEN = `${process.env.REACT_APP_TOKEN}`;
  const BACKDROP = process.env.REACT_APP_BACKDROP;
  const POSTERURL = process.env.REACT_APP_POSTERURL;
  const [details, setDetails] = useState(null);
  const [showFullOverview, setShowFullOverview] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState();
  const [watchProviders, setWatchProviders] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  useEffect(() => {
    const setBG = () => {
      try {
        if (mediaType === "person") {
          document.body.style.backgroundColor = "#032541e1";
        } else {
          document.body.style.backgroundColor = ""; 
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    setBG();
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [mediaType]); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const detailsData = await fetchDetails(id, mediaType);
        setDetails(detailsData.details);
        setCast(detailsData.cast);

        if (mediaType !== "person") {
          const watchProvidersData = await fetchWatchProviders(id, mediaType);
          setWatchProviders(watchProvidersData);
        }

        // handle videos data if needed
      } catch (error) {
        console.log("Error while fetching data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, mediaType]);

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

  const handleWatchLink = () => {
    console.log("WATCH CALLED..");
    handleWatch(watchProviders);
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

  const handleGetTrailer = () => {
    getTrailer(BASEURL, mediaType, id, TOKEN, setTrailer, openModal);
  };

  return (
    <div>
      <Navbar />
      {showModal && <TrailerModal trailer={trailer} onClose={closeModal} />}

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
                  {mediaType === "person" ? (
                    <div className="poster" style={{ flexDirection: "column" }}>
                      <img
                        src={`${POSTERURL}${
                          details.profile_path || details.poster_path
                        }`}
                        alt={`${details.name || details.title}`}
                        style={{ display: "flex" }}
                      />
                    </div>
                  ) : (
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
                        <button onClick={handleGetTrailer}>
                          <FaPlay />
                        </button>
                      </div>
                    </div>
                  )}

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
                              ? details.biography
                              : details.biography?.substring(0, 200) ??
                                "Biography not available"}{" "}
                          </p>
                          {!showFullOverview && (
                            <p
                              className="biographybtn"
                              onClick={handleReadMore}
                            >
                              Read More
                            </p>
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
                            <p>
                              Number of Seasons: {details.number_of_seasons}
                            </p>
                            <p>
                              Number of Episodes: {details.number_of_episodes}
                            </p>
                            {details.last_episode_to_air && (
                              <div>
                                <p>
                                  Last Episode Aired:{" "}
                                  {details.last_episode_to_air.name}
                                </p>
                                <p>
                                  Last Episode Overview:{" "}
                                  {details.last_episode_to_air.overview}
                                </p>
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
                          <p>
                            {showFullOverview
                              ? details.overview
                              : details.overview?.substring(0, 100) ??
                                "Overview not available"}{" "}
                          </p>
                          {!showFullOverview && (
                            <p className="overviewbtn" onClick={handleReadMore}>
                              Read More
                            </p>
                          )}
                        </div>
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
                          <button onClick={handleGetTrailer}>
                            <FaPlay />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
            {mediaType !== "person" &&
              watchProviders &&
              watchProviders.results &&
              watchProviders.results.IN &&
              watchProviders.results.IN.flatrate &&
              watchProviders.results.IN.flatrate.length > 0 && (
                <div className="watch-provider">
                  <h2>Watch Now!</h2>
                  {watchProviders.results.IN.flatrate.map((provider) => (
                    <div
                      key={provider.id}
                      onClick={handleWatchLink}
                      className="watch-provider-logo"
                      style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${provider.logo_path})`,
                      }}
                    ></div>
                  ))}
                </div>
              )}

            {cast && cast.length > 0 && mediaType !== "person" && (
              <div className="castdiv1">
                <div className="cast-head">
                  <h2>Top Cast</h2>
                </div>
                <div className="castdiv">
                  <div className="castpeopleCards">
                    {cast.map((cast) => (
                      <div
                        key={cast.id}
                        className="castpeopleCard"
                        onClick={() => handleDetails("person", cast.id)}
                      >
                        <img
                          src={
                            cast.profile_path
                              ? `${POSTERURL}${cast.profile_path}`
                              : NoAvatar
                          }
                          alt={cast.name}
                          className="posterimg"
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
