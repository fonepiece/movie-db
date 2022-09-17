import { useEffect, useState } from "react";
import MovieCarousel from "./MovieCarousel";
import MovieItem from "./MovieItem";

function Content({isFavoriteContent}) {
    // state for managing fetched data
    const [movies, setMovies] = useState([]);
    const [filter, setFilter] = useState('popular');

    // function that actually fetches the data asynchronously
    const fetchData = async () => {
        const api = await fetch(`https://api.themoviedb.org/3/movie/${filter}?api_key=872740d273c03dd90e09f632c6c02b2b`);
        const json = await api.json()
        setMovies(json.results.slice(0, 12));
    };
    // When this component mounts we want it to call fetchData, once, so teh second param is an empty array.
    useEffect(() => {
        fetchData();
    }, [filter]);

    const [favs, setFavs] = useState(() => {
        const data = localStorage.getItem('favorites')
        return data ? JSON.parse(data) : []
    })
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favs));        
    }, [favs])

    const toggleFavorites = (movie) => {
        if (favs.find(m => m.id === movie.id)) {
            setFavs(favorites => favorites.filter(m => m.id !== movie.id))
        } else {
            setFavs(favorites => [...favorites, movie])
        }
    }
    

    if (isFavoriteContent) {
        return (
            <main className="site-main container">
                <section className="movie-container">
                    <div className="all-movies favorite-movies">
                        {favs.map(movie => <MovieItem key={movie.id} movie={movie} toggleFavorites={toggleFavorites} isFavorite={!!favs.find(m => m.id === movie.id)} />)}
                        {favs.length === 0 && <div>Sorry you have no favourited movies. Return to the home page to add a favourite movie</div>}
                    </div>
                </section>
            </main>
        )
    }

    if (!movies) return
    return (
        <main className="site-main container">
            <div style={{position: 'relative', height: '350px', overflow: 'hidden'}}>
                <MovieCarousel movies={movies} />
                <section className="select-page">
                    <div className="row g-3 align-items-end">
                        <div className="col-auto">
                            <label htmlFor="movie-filter" className="col-form-label">Display by:</label>
                        </div>
                        <div className="col-auto">
                            <select value={filter} onChange={(e) => setFilter(e.target.value)} name="movie-filter" className="form-select movie-filter" aria-label="Default select example">
                                <option value="popular">Popular</option>
                                <option value="now_playing">Now Playing</option>
                                <option value="top_rated">Top Rating</option>
                                <option value="upcoming">Upcoming</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <h1 className="main-title">All Movies</h1>
                    </div>
                </section>
            </div>
            <section className="movie-container">
                <div className="all-movies">
                    {movies.map(movie => <MovieItem key={movie.id} movie={movie} toggleFavorites={toggleFavorites} isFavorite={!!favs.find(m => m.id === movie.id)} />)}
                </div>
            </section>
        </main>
    )
}

export default Content