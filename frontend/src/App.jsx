import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import RequireAuth from './components/RequireAuth';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/Auth';  // Fixed: Import AuthProvider

function App() {
  return (
    <AuthProvider> {/* Wrapped entire app inside AuthProvider */}
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<TourDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            
          

            <Route path="/booking/:tourId" element={
              <RequireAuth>
                <Booking />
              </RequireAuth>
            } />

          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </AuthProvider>
  );
}

export default App;
