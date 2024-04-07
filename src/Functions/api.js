import axios from "axios";

const TOKEN = `${process.env.REACT_APP_TOKEN}`;
const BASEURL = `${process.env.REACT_APP_BASEURL}`;
const PERSON = `${process.env.REACT_APP_PERSON}`;

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


export const fetchDetails = async (id, mediaType) => {
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

      const creditsResponse = await axios.get(
        `${BASEURL}${mediaType}/${id}/credits`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${TOKEN}`,
          },
        }
      );

      return { details: response.data, cast: creditsResponse.data.cast };
    }
    return { details: response.data, cast: [] };
  } catch (error) {
    throw new Error("Error while fetching details: " + error);
  }
};

export const fetchWatchProviders = async (id, mediaType) => {
  try {
    const response = await axios.get(
      `${BASEURL}${mediaType}/${id}/watch/providers`,
      {
        headers: {
          accept: "application/json",
          Authorization: `${TOKEN}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching watch providers: " + error);
  }
};

export const fetchVideos = async (id, mediaType) => {
  try {
    const response = await axios.get(`${BASEURL}${mediaType}/${id}/videos`, {
      headers: {
        accept: "application/json",
        Authorization: `${TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error while fetching videos: " + error);
  }
};



export const getTrailer = async (BASEURL, mediaType, id, TOKEN, setTrailer, openModal) => {
  try {
    const response = await axios.get(`${BASEURL}${mediaType}/${id}/videos`, {
      headers: {
        accept: "application/json",
        Authorization: `${TOKEN}`,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      const trailerVideo = response.data.results.find(
        (video) => video.type === "Trailer"
      );

      if (trailerVideo) {
        setTrailer(`https://www.youtube.com/watch?v=${trailerVideo.key}`);
        openModal();
      } else {
        console.log("No trailer found.");
      }
    } else {
      console.log("No videos found in the response.");
    }
  } catch (error) {
    console.log("Error loading the trailer", error);
  }
};

export const handleWatch = () => {
  if (watchProviders && watchProviders.results && watchProviders.results.IN) {
    const providerLink = watchProviders.results.IN.link;
    if (providerLink) {
      window.location.href = providerLink;
    } else {
      console.log("Provider link not available.");
    }
  } else {
    console.log("Watch providers data not available.");
  }
};
