import { Link } from 'react-router-dom';
import Herobg from '../assets/hero.jpg';

function Hero() {
  return (
    <div className="relative h-[80vh] bg-blue-50">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${Herobg})`,
        }}
      >
       <div className="absolute inset-0 bg-blue-200/30"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-950 mb-4">
            Discover Your Next Adventure
          </h1>
          <p className="text-xl md:text-2xl text-gray-950 mb-8">
            Book unforgettable tours with ease and confidence.
          </p>
          <div>
            <Link 
              to="/tours"
              className="inline-block px-8 py-4 bg-blue-900 text-white rounded-2xl hover:bg-blue-600 transition-colors shadow-md text-lg"
            >
              Come Fly With Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;