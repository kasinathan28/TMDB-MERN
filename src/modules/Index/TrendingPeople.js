import React from "react";
import "./Index.css";
import defaultProfileImage from "../../assets/No_avatar.png";

function TrendingPeople({ trendingPeople, handleDetails, activePeopleItem, setActivePeopleItem }) {
  return (
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
      <div className="trendingPeople">
        <div className="trendingPeopleCards">
          {trendingPeople && trendingPeople.map((person, index) => (
            <div
              key={index}
              className="trendingPeopleCard"
              onClick={() => handleDetails(person.media_type, person.id)}
            >
              <img
                src={person.profile_path ? `https://images.tmdb.org/t/p/w300${person.profile_path}` : defaultProfileImage}
                alt={person.name}
              />
              <div className="personname">
                <p>{person.name}</p>
                <div className="popularity">{`${person.popularity.toFixed(2)}`}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrendingPeople;
