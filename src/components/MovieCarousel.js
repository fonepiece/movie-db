import { Carousel } from "react-bootstrap";
import { BrowserRouter, Link } from "react-router-dom";

export default function MovieCarousel({ movies }) {
  return (
    <div>
      <Carousel
        fade
        interval={7000}
        indicators={false}
        controls={false}
        style={{ position: "absolute", left: 0, right: 0}}
      >
        {movies.map((movie) => {
          return (
            <Carousel.Item>
              <div className="hero-movie-title">
                  
                      <h2><Link to={`/movie/${movie.id}`}>{movie.title}</Link></h2>
                  
              </div>
              <img
                style={{ objectFit: "cover" }}
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt="First slide"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}
