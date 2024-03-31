import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../../components/Navbar/Navbar";
import wave from "../../../assets/wave2.png";
import "./Index.css";
import Loader from "../../components/Loader/Loader";
import Footer from "../../components/Footer/Footer";
import MainContent from "./MainContent";

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
          <>
            <Navbar />
            <MainContent
              movies={movies}
              randomIndex={randomIndex}
              handleSearch={handleSearch}
              setSearchQuery={setSearchQuery}
              searchInputRef={searchInputRef}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              handleDetails={handleDetails}
              POSTERURL={POSTERURL}
              trendingTVShows={trendingTVShows}
              activePeopleItem={activePeopleItem}
              setActivePeopleItem={setActivePeopleItem}
              trendingPeople={trendingPeople}
              BASEURL={BASEURL}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Index;
