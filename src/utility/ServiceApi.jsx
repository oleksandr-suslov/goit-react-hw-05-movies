import axios from 'axios';
 
const BASE_URL=`https://api.themoviedb.org/3/`
const KEY = 'f563ae14d0dd21bfc240b1890e6683c0';

 const finding = {
  TRENDING: "trending",
  SEARCH: "search",
  MOVIE: "movie",
};


const serviceApi = async (finding, firstVar, secondVar) => {
  let response;
  switch (finding) {
      case "trending":
        response = await axios.get(`${BASE_URL}trending/movie/week?api_key=${KEY}`);
        break;
      case "search":
         response = await axios.get(`${BASE_URL}search/movie?api_key=${KEY}&language=en-US&page=1&include_adult=false&query=${firstVar}`); 
        break;
      case "movie":
        if (secondVar === 'cast')
        {   response = await axios.get(`${BASE_URL}movie/${firstVar}/credits?api_key=${KEY}&language=en-US` ); 
        break;}
      if (secondVar === 'reviews')
        {   response = await axios.get(`${BASE_URL}movie/${firstVar}/reviews?api_key=${KEY}&language=en-US&page=1` ); 
        break;}
        if(firstVar)
        {
          response = await axios.get(`${BASE_URL}movie/${firstVar}?api_key=${KEY}&language=en-US}`);
      break;
  }
        
        break;
      default:
        return ;
  }
  return response.data;
  };
export { serviceApi, finding};
