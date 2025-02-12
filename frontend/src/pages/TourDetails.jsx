import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Footer from '../components/Footer';

function TourDetails() {
  const { id } = useParams();
  const [activeDay, setActiveDay] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  // Mock data - Replace with actual API call
  const tour = {
    id: id,
    title: "Mountain Trek Adventure",
    mainImage: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1433838552652-f9a46b332c40?ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3"
    ],
    price: 299,
    duration: "3 days",
    location: "Swiss Alps",
    groupSize: "4-12 people",
    difficulty: "Moderate",
    description: "Experience the thrill of mountain climbing with expert guides. This adventure takes you through breathtaking alpine landscapes, challenging peaks, and serene valleys. Perfect for both beginners and experienced climbers.",
    itinerary: [
      {
        day: 1,
        title: "Arrival and Orientation",
        description: "Meet your guides and fellow adventurers. Equipment check and safety briefing. Short practice climb."
      },
      {
        day: 2,
        title: "Main Summit Attempt",
        description: "Early morning start. Full day of climbing with spectacular views. Professional photography session at the peak."
      },
      {
        day: 3,
        title: "Valley Exploration",
        description: "Relaxed hiking through the valley. Visit to local villages. Farewell dinner and certificate ceremony."
      }
    ],
    reviews: [
      {
        id: 1,
        name: "John Doe",
        rating: 5,
        comment: "Amazing experience! The guides were very professional and helpful."
      },
      {
        id: 2,
        name: "Jane Smith",
        rating: 4,
        comment: "Beautiful views and great company. Would recommend to others."
      }
    ]
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src={tour.mainImage}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            {tour.title}
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Price</h3>
            <p className="text-3xl font-bold text-blue-900">${tour.price}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Duration</h3>
            <p className="text-3xl font-bold text-blue-900">{tour.duration}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Group Size</h3>
            <p className="text-3xl font-bold text-blue-900">{tour.groupSize}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Difficulty</h3>
            <p className="text-3xl font-bold text-blue-900">{tour.difficulty}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Tour Overview</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8">{tour.description}</p>
          <Link
            to={`/booking/${id}`}
            className="inline-block px-8 py-4 bg-blue-900 text-white rounded-xl hover:bg-blue-600 transition-colors shadow-md text-lg font-semibold"
          >
            Book Now
          </Link>
        </div>

        {/* Image Gallery */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tour.images.map((image, index) => (
              <div
                key={index}
                className="relative h-48 cursor-pointer rounded-xl overflow-hidden"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Tour ${index + 1}`}
                  className="w-full h-full object-cover hover:opacity-75 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Itinerary */}
        {/* <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Itinerary</h2>
          <div className="space-y-4">
            {tour.itinerary.map((day) => (
              <div key={day.day} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                  onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                >
                  <span className="font-semibold text-lg">Day {day.day}: {day.title}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform ${
                      activeDay === day.day ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeDay === day.day && (
                  <div className="px-6 py-4">
                    <p className="text-gray-600">{day.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div> */}

        {/* Reviews */}
        {/* <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Reviews</h2>
          <div className="space-y-6">
            {tour.reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex items-center mb-2">
                  <div className="flex mr-2">
                    {renderStars(review.rating)}
                  </div>
                  <span className="font-semibold">{review.name}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={() => setSelectedImage(null)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt="Selected tour"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
}

export default TourDetails;