import axios from "axios";

const TOKEN = `${process.env.REACT_APP_TOKEN}`;
const BASEURL = `${process.env.REACT_APP_BASEURL}`;

export const fetchMovies = async (timeFrame) => {
  try {
    const response = await axios.get(`${BASEURL}trending/movie/${timeFrame}`, {
      headers: {
        accept: "application/json",
        Authorization: `${TOKEN}`,
      },
    });
    return response.data.results.slice(0, 12);
  } catch (error) {
    console.log("Error fetching movies:", error);
    return [];
  }
};

export const fetchTrendingTVShows = async (timeFrame) => {
  try {
    const response = await axios.get(`${BASEURL}trending/tv/${timeFrame}`, {
      headers: {
        accept: "application/json",
        Authorization: `${TOKEN}`,
      },
    });
    return response.data.results.slice(0, 12);
  } catch (error) {
    console.log("Error fetching trending TV shows:", error);
    return [];
  }
};

export const fetchTrendingPeople = async (timeFrame) => {
  try {
    const response = await axios.get(`${BASEURL}trending/person/${timeFrame}`, {
      headers: {
        accept: "application/json",
        Authorization: `${TOKEN}`,
      },
    });
    return response.data.results.slice(0, 12);
  } catch (error) {
    console.log("Error fetching trending people:", error);
    return [];
  }
};
