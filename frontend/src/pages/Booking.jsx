import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

function Booking() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    tourId: tourId || '',
    date: '',
    package: '',
    name: '',
    email: '',
    phone: ''
  });

  // Mock tour data (Replace with actual API call)
  const tours = [
    {
      id: 1,
      title: "Mountain Trek",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3",
      price: 299,
      packages: [
        { id: 1, name: 'Standard', price: 299, features: ['Basic equipment', 'Group guide', 'Standard accommodation'] },
        { id: 2, name: 'Premium', price: 499, features: ['Premium equipment', 'Private guide', 'Luxury accommodation'] },
        { id: 3, name: 'Luxury', price: 799, features: ['Top-tier equipment', 'Expert guide', '5-star accommodation'] }
      ]
    },
    {
      id: 2,
      title: "Beach Paradise",
      image: "https://images.unsplash.com/photo-1520116468816-95b69f847357?ixlib=rb-4.0.3",
      price: 399,
      packages: [
        { id: 1, name: 'Standard', price: 399, features: ['Beach access', 'Shared transfers', 'Standard room'] },
        { id: 2, name: 'Premium', price: 599, features: ['VIP beach access', 'Private transfers', 'Ocean view room'] },
        { id: 3, name: 'Luxury', price: 899, features: ['Private beach', 'Helicopter transfers', 'Beach villa'] }
      ]
    }
  ];

  const selectedTour = tourId ? tours.find(tour => tour.id === parseInt(tourId)) : null;
  if (!selectedTour) {
    return <div className="text-center text-red-500">Tour not found</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({ ...prev, [name]: value }));
  };

  const handlePackageSelect = (packageId) => {
    setBookingData(prev => ({ ...prev, package: packageId }));
  };

  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', bookingData);
    alert('Booking successful!');
    navigate('/');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{selectedTour.title}</h2>
          <img src={selectedTour.image} alt={selectedTour.title} className="w-full h-48 object-cover rounded-lg mb-4" />

          {currentStep === 1 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Select Date</h3>
              <input
                type="date"
                name="date"
                value={bookingData.date}
                onChange={handleInputChange}
                min={new Date().toISOString().split('T')[0]}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleNextStep}
                disabled={!bookingData.date}
                className="w-full mt-6 px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                Continue
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Choose Package</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {selectedTour.packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    onClick={() => handlePackageSelect(pkg.id)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      bookingData.package === pkg.id ? 'border-blue-900 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <h3 className="text-lg font-semibold">{pkg.name}</h3>
                    <p className="text-lg font-bold text-blue-900">${pkg.price}</p>
                    <ul className="text-sm text-gray-600">
                      {pkg.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-6">
                <button onClick={handlePrevStep} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!bookingData.package}
                  className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Confirm Booking</h3>
              <form onSubmit={handleSubmit}>
                <label className="block mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={bookingData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  required
                />
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={bookingData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  required
                />
                <label className="block mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={bookingData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                  required
                />
                <div className="border-t pt-4 text-gray-700">
                  <p>Tour: {selectedTour.title}</p>
                  <p>Date: {bookingData.date}</p>
                  <p>Package: {selectedTour.packages.find(p => p.id === bookingData.package)?.name}</p>
                  <p className="text-xl font-bold text-blue-900">
                    Total: ${selectedTour.packages.find(p => p.id === bookingData.package)?.price}
                  </p>
                </div>
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={handlePrevStep} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg">
                    Back
                  </button>
                  <button type="submit" className="px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-600">
                    Confirm Booking
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Booking;
