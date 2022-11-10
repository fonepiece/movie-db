import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PageHome from '../pages/PageHome';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PageAbout from '../pages/PageAbout';
import MovieDetails from '../components/MovieDetails';

function App() {
  return (
    <BrowserRouter>
      <div style={{display: 'flex', flexDirection: 'column'}} className="vh-100">
        <div style={{flex: 1}}>
          <Header />
          <Routes>
            <Route path="/" exact element={<PageHome />} />
            <Route path="/about" exact element={<PageAbout />} />
            <Route path="/favorites" exact element={<PageHome isFavoriteContent={true} />} />
            <Route path="/movie/:movieId" exact element={<MovieDetails /> } />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
