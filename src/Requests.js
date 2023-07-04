const key = process.env.REACT_APP_IMDB_API_KEY
const apiUrl = 'https://api.themoviedb.org/3/';
const requests = {
    requestPopular: `${apiUrl}movie/popular?api_key=${key}&language=en-US&page=2`,
    requestTopRated: `${apiUrl}movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestMystery: `${apiUrl}search/movie?api_key=${key}&language=en-US&query=Mystery&page=1&include_adult=false`,
    requestUpcoming: `${apiUrl}movie/upcoming?api_key=${key}&language=en-US&page=1`,
    requestAllMovies: `${apiUrl}discover/movie?api_key=${key}&language=en-US&page=1`,
}

export default requests