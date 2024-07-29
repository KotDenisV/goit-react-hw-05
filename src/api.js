import axios from "axios";
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const accessToken = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzJhZjM3ZDMyMjkwYTlhMWRiNjBiZmE3NjBkOWViNCIsIm5iZiI6MTcyMjE4MzkxMC4yMDkwMTYsInN1YiI6IjY2YTY2YjUwZWMzN2RkOWMzODNhMTRkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BTDAs8JDmIs4C2ct0x7Zh12LDaDH7CQZJHLuLpUmwh0';
const options = {
  headers: {	
    Authorization: `Bearer ${accessToken}`
  }
};

const getTrendingMovies = async () => {
  const responce = await axios.get('trending/movie/day', options);
  console.log(responce.data.results)
  return responce.data.results;
};

const getSearchMovies = async (query) => {
  const responce = await axios.get(`search/movie?query=${query}`, options);
  console.log(responce.data.results)
  return responce.data.results;
};

export {
  getTrendingMovies,
  getSearchMovies  
};