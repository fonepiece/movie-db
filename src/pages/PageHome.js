import { useEffect, useState } from "react";
import MovieCarousel from "../components/MovieCarousel";
import MovieItem from "../components/MovieItem";
import MoviePagination from "../components/MoviePagination";

function PageHome({ isFavoriteContent }) {
  // state for managing fetched data
  
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState("popular");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  //search function
  const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?&api_key=2cb68d27ae663dc4770f1487751583a0&query=";
  const [searchTerm, setSearchTerm] = useState("");
  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      fetch(SEARCH_API + searchTerm)
        .then((res) => res.json())
        .then((data) => {
          setMovies(data.results);
          setSearchTerm("");
        });
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // function that actually fetches the data asynchronously
  const fetchData = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/${filter}?page=${page}&api_key=872740d273c03dd90e09f632c6c02b2b`
    );
    const json = await api.json();
    setMovies(json.results);
    setTotalPage(json.total_pages);
  };
  // When this component mounts we want it to call fetchData, once, so teh second param is an empty array.
  useEffect(() => {
    fetchData();
  }, [filter, page]);

  useEffect(() => {
    setPage(1);
  }, [filter]);


  const [favs, setFavs] = useState(() => {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  });
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favs));
  }, [favs]);

  const toggleFavorites = (movie) => {
    if (favs.find((m) => m.id === movie.id)) {
      setFavs((favorites) => favorites.filter((m) => m.id !== movie.id));
    } else {
      setFavs((favorites) => [...favorites, movie]);
    }
  };

  if (isFavoriteContent) {
    return (
      <main className="site-main container">
        <h2 className="title-fav">
          <span className="pink-text">Favourite Movies</span>
        </h2>
        <section className="movie-container">
          <div className="all-movies favorite-movies">
            {favs.map((movie) => (
              <MovieItem
                key={movie.id}
                movie={movie}
                toggleFavorites={toggleFavorites}
                isFavorite={!!favs.find((m) => m.id === movie.id)}
              />
            ))}
            {favs.length === 0 && (
              <div className="sorry-text">
                <p>
                  Sorry you have no favourite movies. Please return to the home
                  page to add a favourite movie!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    );
  }

  if (!movies) return;
  return (
    <main className="site-main">
      <div className="hero">
        <MovieCarousel movies={movies} />
      </div>
      <section className="movie-container">
        <section className="select-page">
          <h2>
            <span className="pink-text">Browse</span> Movies
          </h2>
          <form onSubmit={handleOnSubmit}>
          <input
            className="search"
            type="search"
            placeholder="Search" 
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
          <div className="row g-3 align-items-end" style={{marginTop: 1}}>
            <div className="col-auto title">
              <label htmlFor="movie-filter" className="col-form-label">
                Display by:
              </label>
            </div>
            <div className="col-auto">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                name="movie-filter"
                className="form-select movie-filter"
                aria-label="Default select example"
                style={{lineHeight: 1, marginBottom: 4}}
              >
                <option value="popular">Popular</option>
                <option value="now_playing">Now Playing</option>
                <option value="top_rated">Top Rated</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
        </section>
        <div className="all-movies">
          {movies.map((movie) => (
            <MovieItem
              key={movie.id}
              movie={movie}
              toggleFavorites={toggleFavorites}
              isFavorite={!!favs.find((m) => m.id === movie.id)}
            />
          ))}
        </div>
        <MoviePagination activePage={page} setPage={setPage} totalPage={totalPage} />
      </section>
    </main>
  );
}

export default PageHome;
