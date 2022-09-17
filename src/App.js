import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import About from './About';
import MovieDetails from './MovieDetails';

function App() {
  return (
    <BrowserRouter>
      <div style={{display: 'flex', flexDirection: 'column'}} className="vh-100">
        <div style={{flex: 1}}>
          <Header />
          <Routes>
            <Route path="/" exact element={<Content />} />
            <Route path="/about" exact element={<About />} />
            <Route path="/favorites" exact element={<Content isFavoriteContent={true} />} />
            <Route path="/movie/:movieId" exact element={<MovieDetails /> } />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
