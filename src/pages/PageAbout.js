export default function About() {
    return (
        <main class="site-main container">
       
        <section className="about-page-box">
            <div className="about-page-info">
                <h1><span className="pink-text">Welcome to CineFun</span></h1>
                <p style={{paddingBottom: 15}}>
                    CineFun movie database is a website where users can find popular, top rated, now playing and upcoming movie listings. Browse for your favourite genres or movies, check out their ratings and see how they match up! Found something you like? Add them to your favourites and remove any item anytime.This product uses the TMDb API but is not endorsed or certified by TMDb. CineFun is a React JS project created by Reyhan Taze and Yegor Nino, currently enrolled in BCIT's Technical Web Developer program.
                </p>
                
                <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
                <img style={{height: 40, width: 40, alignSelf: 'center'}} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" />
            </div>
        </section>
        </main>
    )
}