import axios from "axios";

axios.defaults.baseURL = `https://api.themoviedb.org/3/`;
const KEY = "f563ae14d0dd21bfc240b1890e6683c0";

const getTrendingMovies = async (page) => {
  const response = await axios.get(
    `trending/movie/week?api_key=${KEY}&page=${page}`
  );
  return response.data;
};

const findingMovie = async (page, search) => {
  const response = await axios.get(
    `search/movie?api_key=${KEY}&language=en-US&page=${page}&include_adult=false&query=${search}`
  );
  return response.data;
};

const getMovieDetails = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}?api_key=${KEY}&language=en-US}`
  );
  return response.data;
};

const getCastDetails = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}/credits?api_key=${KEY}&language=en-US`
  );
  return response.data;
};
const getReviewsDetails = async (movieId) => {
  const response = await axios.get(
    `movie/${movieId}/reviews?api_key=${KEY}&language=en-US&page=1`
  );
  return response.data;
};
export {
  getTrendingMovies,
  findingMovie,
  getMovieDetails,
  getCastDetails,
  getReviewsDetails,
};
