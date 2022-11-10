import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useLocation } from "react-router-dom";

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();
  const { pathname } = useLocation();

  const fetchData = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=872740d273c03dd90e09f632c6c02b2b`
    );
    const json = await api.json();
    setMovie(json);
  };

  useEffect(() => {
    fetchData();
  }, [movieId]);

  const [favs, setFavs] = useState(() => {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  });
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favs));
  }, [favs]);

  if (!movie) return null;

  const fullStarCount = Math.floor(movie.vote_average / 2);
  const halfStarCount =
    movie.vote_average - Math.floor(movie.vote_average) >= 0.5 ? 1 : 0;
  const emptyStarCount = 5 - (fullStarCount + halfStarCount);

  const toggleFavorites = (movie) => {
    if (favs.find((m) => m.id === movie.id)) {
      setFavs((favorites) => favorites.filter((m) => m.id !== movie.id));
    } else {
      setFavs((favorites) => [...favorites, movie]);
    }
  };
  const poster = movie.poster_path
    ? `https://www.themoviedb.org/t/p/w600_and_h900_bestv2/${movie.poster_path}`
    : "http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png";
  const isFavorite = !!favs.find((m) => m.id === movie.id);
  const backdrop = `https://www.themoviedb.org/t/p/w533_and_h300_bestv2/${movie.poster_path}`;

  //function to return the crew's name from the movie crew data by passing a postion parameter
  const getCrewInfo = (position) => {
    const results = movie.credits.crew.filter(
      (person) => person.job === position
    );

    if (results.length === 0) {
      return <p>{position} Coming soon...</p>;
    }

    const resultList = results.map((result, i) => (
      <p key={i} className="crew">
        {result.name}
      </p>
    ));

    return resultList;
  };

  return (
    <div
      className="container movie-details"
      style={{ display: "flex", paddingLeft: 20, paddingRight: 20 }}
    >
      <div style={{ flex: 1, position: "relative" }}>
        <img className="single-poster" src={poster} alt={movie.title} />
      </div>
      <div style={{ flex: 2 }}>
        <h1>{movie.title}</h1>
        <p>Release Date: {movie.release_date}</p>
        <div className="rating">
          {[...Array(fullStarCount).keys()].map((i) => (
            <i key={i} className="fa-solid fa-star"></i>
          ))}
          {!!halfStarCount &&
            [...Array(halfStarCount).keys()].map((i) => (
              <i key={i} className="fa-regular fa-star-half-stroke"></i>
            ))}
          {[...Array(emptyStarCount).keys()].map((i) => (
            <i key={i} className="fa-regular fa-star"></i>
          ))}
        </div>

        {movie.tagline && (
          <section className="tagline">
            <p>{movie.tagline}</p>
          </section>
        )}

        <p style={{ padding: "25px" }}>{movie.overview}</p>

        <div className="genre-info">
          <h3>Genre</h3>
          <div className="genre-list">
            {movie.genres.length > 0 ? (
              movie.genres.map((genre, i) => <p key={i}>{genre.name}</p>)
            ) : (
              <p>Genre coming soon...</p>
            )}
          </div>
        </div>

        <div className="single-movie-buttons">
          <div>
            {!isFavorite && (
              <a
                href="#"
                className="btn btn-outline-danger"
                onClick={() => toggleFavorites(movie)}
              >
                Add to Favorites
              </a>
            )}
            {isFavorite && (
              <a
                href="#"
                className="btn btn-danger"
                onClick={() => toggleFavorites(movie)}
              >
                Remove from Favorites
              </a>
            )}
          </div>

          <a className="btn btn-outline-danger">
            <Nav.Link href="/" active={pathname === "/"}>
              Back to Home
            </Nav.Link>
          </a>
        </div>
      </div>
      <img className="bg-cover" src={backdrop} />
    </div>
  );
}
