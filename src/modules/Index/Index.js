import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Index.css";
import Loader from "../../components/Loader/Loader";
import {
  fetchMovies,
  fetchTrendingTVShows,
  fetchTrendingPeople,
} from "../../Functions/api";
import MainDiv from "./MainDiv";
import TrendingMovies from "./TrendingMovies";
import TrendingTVShows from "./TrendingTVShows";
import TrendingPeople from "./TrendingPeople";

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
  const searchInputRef = React.useRef(null);

  
  useEffect(() => {
    const fetchData = async () => {
      const movieData = await fetchMovies(
        activeItem === "Today" ? "day" : "week"
      );
      const tvShowData = await fetchTrendingTVShows(
        activeItem === "Today" ? "day" : "week"
      );
      const peopleData = await fetchTrendingPeople(
        activePeopleItem === "Today" ? "day" : "week"
      );

      setMovies(movieData);
      setTrendingTVShows(tvShowData);
      setTrendingPeople(peopleData);
      setLoading(false);
    };

    fetchData();
  }, [activeItem, activePeopleItem]); 

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []); 

  
  const handleSearch = async () => {
    if (searchQuery.trim() !== "") {
      navigate(`/search/${searchQuery}`);
    }
  };

  
  const handleDetails = (mediaType, id) => {
    navigate(`/details/${mediaType}/${id}`);
  };

  return (
    <div className="index">
      <div className="after">
        {loading ? (
          <Loader />
        ) : (
          <div>
            <Navbar />
            <MainDiv
              movies={movies}
              randomIndex={randomIndex}
              setRandomIndex={setRandomIndex}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              searchInputRef={searchInputRef}
              navigate={navigate}
              loading={loading}
            />
            <TrendingMovies
              movies={movies}
              handleDetails={handleDetails}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />

            <TrendingTVShows
              trendingTVShows={trendingTVShows}
              handleDetails={handleDetails}
            />

            <TrendingPeople
              trendingPeople={trendingPeople}
              handleDetails={handleDetails}
              activePeopleItem={activePeopleItem}
              setActivePeopleItem={setActivePeopleItem}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
