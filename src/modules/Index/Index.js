import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import wave from "../../assets/wave2.png";
import "./Index.css";
import Loader from "../../components/Loader/Loader";
import Footer from "../../components/Footer/Footer";

function Index() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [randomIndex, setRandomIndex] = useState(null);
  const [activeItem, setActiveItem] = useState("Today");
  const [activePeopleItem, setActivePeopleItem] = useState("Today");
  const [trendingPeople, setTrendingPeople] = useState([]);
  const [trendingTVShows, setTrendingTVShows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const TOKEN = `${process.env.REACT_APP_TOKEN}`;
  const BASEURL = `${process.env.REACT_APP_BASEURL}`;
  const POSTERURL = `${process.env.REACT_APP_POSTERURL}`;
  const BACKDROP = `${process.env.REACT_APP_BACKDROP}`;
  const searchInputRef = React.useRef(null);

  useEffect(() => {
    const fetchMovies = async (timeFrame) => {
      try {
        const response = await axios.get(
          `${BASEURL}trending/movie/${timeFrame}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `${TOKEN}`,
            },
          }
        );
        setMovies(response.data.results.slice(0, 12));
        if (response.data.results.length > 0) {
          setRandomIndex(
            Math.floor(Math.random() * response.data.results.length)
          );
        }
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };

    const fetchTrendingTVShows = async (timeFrame) => {
      try {
        const response = await axios.get(`${BASEURL}trending/tv/${timeFrame}`, {
          headers: {
            accept: "application/json",
            Authorization: `${TOKEN}`,
          },
        });
        setTrendingTVShows(response.data.results.slice(0, 12));
      } catch (error) {
        console.log("Error fetching trending TV shows:", error);
      }
    };
    fetchMovies(activeItem === "Today" ? "day" : "week");
    fetchTrendingTVShows(activeItem === "Today" ? "day" : "week");
    setLoading(false)
  }, [activeItem, BASEURL, TOKEN]);

  useEffect(() => {
    const fetchTrendingPeople = async (timeFrame) => {
      try {
        const response = await axios.get(
          `${BASEURL}trending/person/${timeFrame}`,
          {
            headers: {
              accept: "application/json",
              Authorization: `${TOKEN}`,
            },
          }
        );
        setTrendingPeople(response.data.results.slice(0, 12));
      } catch (error) {
        console.log("Error fetching trending people:", error);
      }
    };

    fetchTrendingPeople(activePeopleItem === "Today" ? "day" : "week");
  }, [activePeopleItem, BASEURL, TOKEN]);

  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
    }
  };

  const handleDetails = (mediaType, id) => {
    navigate(`/details/${mediaType}/${id}`);
  };

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const getNextRandomIndex = () => {
    if (movies.length === 0) return null;
    let newIndex = randomIndex;
    while (!movies[newIndex]?.backdrop_path) {
      newIndex = (newIndex + 1) % movies.length;
    }
    return newIndex;
  };

  useEffect(() => {
    setRandomIndex(getNextRandomIndex());
  }, [movies, randomIndex]);

  return (
    <div className="index">

      <div className="after">
        {loading ? (
          <Loader />
          ) : (
            <div>
            <Navbar />
            <div className="main">
              {randomIndex !== null && (
                <img
                  src={`${BACKDROP}${movies[randomIndex]?.backdrop_path}`}
                  className="bgimg"
                  alt={`${movies.title}`}
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

              <div className="trend">
              <div className="label">
                <h2>Trending Tv Shows:</h2>
                </div>
                </div>  

              <div className="cardctn">
                <div className="cardctnbg">
                  <img src={wave} alt="wave" />
                </div>
                {trendingTVShows.map((tvShow, index) => (
                  <div key={index} className="card">
                    {" "}
                    <img
                      src={`${POSTERURL}${tvShow.poster_path}`}
                      alt={`${tvShow.name}`}
                      onClick={() =>
                        handleDetails(tvShow.media_type, tvShow.id)
                      }
                    />
                    <div className="desc">
                      <p>{tvShow.name}</p>
                      <p>{tvShow.first_air_date}</p>
                    </div>
                    <div className="rating">
                      {tvShow.vote_average.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

            <div className="trend">
              <div className="label">
                <h2>Trending People:</h2>
                <ul>
                  <li
                    className={activePeopleItem === "Today" ? "active" : ""}
                    onClick={() => setActivePeopleItem("Today")}
                  >
                    Today
                  </li>
                  <li
                    className={activePeopleItem === "This Week" ? "active" : ""}
                    onClick={() => setActivePeopleItem("This Week")}
                  >
                    This Week
                  </li>
                </ul>
              </div>
            </div>

            <div className="trendingPeople">
              <div className="trendingPeopleCards">
                {trendingPeople.map((person, index) => (
                  <div
                    key={index}
                    className="trendingPeopleCard"
                    onClick={() => handleDetails(person.media_type, person.id)}
                  >
                    <img
                      src={`${POSTERURL}${person.profile_path}`}
                      alt={person.name}
                    />
                    <div className="personname">
                      <p>{person.name}</p>
                      <div className="popularity">
                        {`${person.popularity.toFixed(2)}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <Footer/> */}
          </div>
        )}
        ;
      </div>
    </div>
  );
}

export default Index;
