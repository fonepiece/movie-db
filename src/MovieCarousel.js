import { Carousel } from "react-bootstrap";

export default function MovieCarousel({movies}) {
    
    return (
        <Carousel fade interval={5000} indicators={false} controls={false} style={{position: 'absolute', left: 0, right: 0, zIndex: -1}}>
            {movies.map(movie => (
                <Carousel.Item>
                    <img
                    style={{objectFit:'cover'}}
                        className="d-block w-100"
                        src={`https://www.themoviedb.org/t/p/w533_and_h300_bestv2/${movie.backdrop_path}`}
                        alt="First slide"
                    />
                </Carousel.Item>
            ))}
        </Carousel>
    )
}