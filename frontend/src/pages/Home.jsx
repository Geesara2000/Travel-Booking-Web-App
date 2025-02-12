import Footer from '../components/Footer';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

function Home() {
  const featuredTours = [
    {
      id: 1,
      title: "Mountain Trek",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3",
      description: "Experience the thrill of mountain climbing with expert guides.",
      price: 299
    },
    {
      id: 2,
      title: "Beach Paradise",
      image: "https://images.unsplash.com/photo-1520116468816-95b69f847357?ixlib=rb-4.0.3",
      description: "Relax on pristine beaches with crystal clear waters.",
      price: 399
    },
    {
      id: 3,
      title: "City Explorer",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3",
      description: "Discover hidden gems in the world's most vibrant cities.",
      price: 199
    }
  ];

  return (
    <div>
      <Hero />
      
      {/* Featured Tours Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Tours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <img 
                  src={tour.image}
                  alt={tour.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{tour.title}</h3>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-900 font-bold">${tour.price}</span>
                    <Link 
                      to={`/booking/${tour.id}`}
                      className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <svg className="w-12 h-12 mx-auto text-blue-900 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Best Price Guarantee</h3>
                <p className="text-gray-600">We offer competitive prices for unforgettable experiences.</p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <svg className="w-12 h-12 mx-auto text-blue-900 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our team is always here to help you with any questions.</p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <svg className="w-12 h-12 mx-auto text-blue-900 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
                <p className="text-gray-600">Simple and secure booking process for your convenience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
}

export default Home;