import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetails from './pages/TourDetails';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Booking from './pages/Booking';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';


function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours/>} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/booking/:tourId" element={<Booking />} />
          <Route path="/privacy" element={<Privacy/>} />
          <Route path="/terms" element={<Terms/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
