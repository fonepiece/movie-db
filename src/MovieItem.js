function MovieItem({movie, isFavorite, toggleFavorites}) {
    const poster = movie.poster_path
        ? `https://www.themoviedb.org/t/p/w440_and_h660_face/${movie.poster_path}` 
        : 'http://www.theprintworks.com/wp-content/themes/psBella/assets/img/film-poster-placeholder.png'

    const fullStarCount = Math.floor(movie.vote_average / 2)
    const halfStarCount = movie.vote_average - Math.floor(movie.vote_average) >= 0.5 ? 1 : 0
    const emptyStarCount = 5 - (fullStarCount + halfStarCount)

    return (
        <div className="movie-item">
            <div className="movie">
                {!isFavorite && <a href="#" className="favorite-icon" onClick={() => toggleFavorites(movie)}><i className='fa-regular fa-heart'></i></a>}
                {isFavorite && <a href="#" className="favorite-icon" onClick={() => toggleFavorites(movie)}><i className='fa-solid fa-heart'></i></a>}
                <img src={poster} alt={movie.title} />
                <div className="hover-info">
                    <p>{movie.overview}</p>
                    <a href={`/single/${movie.id}`}>
                        <button type="button" className="btn btn-outline-danger ">More info</button>
                    </a>
                </div>
            </div>
            <div className="movie-info">
                <div className="poster-bottom">
                    <a href={`/single/${movie.id}`} className="movie-title">{movie.title}</a>
                    <p>{movie.release_date}</p>
                </div>
                <div>
                    {[...Array(fullStarCount).keys()].map(i => <i key={i} className="fa-solid fa-star"></i>)}
                    {!!halfStarCount && [...Array(halfStarCount).keys()].map(i => <i key={i} className="fa-regular fa-star-half-stroke"></i>)}
                    {[...Array(emptyStarCount).keys()].map(i => <i key={i} className="fa-regular fa-star"></i>)}
                </div>
            </div>
        </div>
    )
}

export default MovieItem