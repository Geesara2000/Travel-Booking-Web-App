import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

function Tours() {
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredTours, setFilteredTours] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data
  const tours = [
    {
      id: 1,
      title: "Mountain Trek Adventure",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3",
      description: "Experience the thrill of mountain climbing with expert guides.",
      price: 299,
      duration: "3 days",
      difficulty: "Moderate",
      location: "Swiss Alps",
      type: "Adventure"
    },
    {
      id: 2,
      title: "Beach Paradise Getaway",
      image: "https://images.unsplash.com/photo-1520116468816-95b69f847357?ixlib=rb-4.0.3",
      description: "Relax on pristine beaches with crystal clear waters.",
      price: 399,
      duration: "5 days",
      difficulty: "Easy",
      location: "Maldives",
      type: "Beach"
    },
    {
      id: 3,
      title: "City Explorer Package",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3",
      description: "Discover hidden gems in the world's most vibrant cities.",
      price: 199,
      duration: "2 days",
      difficulty: "Easy",
      location: "Paris",
      type: "Cultural"
    }
  ];

  const locations = ["Swiss Alps", "Maldives", "Paris", "Tokyo", "New York"];
  const durations = ["1-3 days", "4-7 days", "8+ days"];
  const tourTypes = ["Adventure", "Beach", "Cultural", "Wildlife"];

  // Debounced search function
  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Search function
  const searchTours = useCallback((query, toursToSearch) => {
    if (!query) return toursToSearch;
    
    const searchTerms = query.toLowerCase().split(' ');
    return toursToSearch.filter(tour => {
      const searchableText = `
        ${tour.title} 
        ${tour.description} 
        ${tour.location} 
        ${tour.type}
      `.toLowerCase();
      
      return searchTerms.every(term => searchableText.includes(term));
    });
  }, []);

  // Filter tours based on selected criteria and search query
  useEffect(() => {
    setIsSearching(true);
    
    const debouncedFilter = debounce(() => {
      let result = [...tours];

      // Apply search
      if (searchQuery) {
        result = searchTours(searchQuery, result);
      }

      // Price range filter
      result = result.filter(tour => 
        tour.price >= priceRange.min && tour.price <= priceRange.max
      );

      // Location filter
      if (selectedLocation) {
        result = result.filter(tour => tour.location === selectedLocation);
      }

      // Duration filter
      if (selectedDuration) {
        result = result.filter(tour => tour.duration.includes(selectedDuration));
      }

      // Tour type filter
      if (selectedTypes.length > 0) {
        result = result.filter(tour => selectedTypes.includes(tour.type));
      }

      // Sorting
      if (sortBy === 'price-low') {
        result.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        result.sort((a, b) => b.price - a.price);
      }

      setFilteredTours(result);
      setIsSearching(false);
    }, 300);

    debouncedFilter();
  }, [searchQuery, priceRange, selectedLocation, selectedDuration, selectedTypes, sortBy, searchTours]);

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange({ min: 0, max: 1000 });
    setSelectedLocation('');
    setSelectedDuration('');
    setSelectedTypes([]);
    setSortBy('');
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Available Tours</h1>
          <p className="text-xl text-gray-600">Find your perfect adventure</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tours by name, location, or type..."
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm flex items-center justify-center space-x-2"
          >
            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:block ${showFilters ? 'block' : 'hidden'} mb-8 lg:mb-0`}>
            <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$0</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Duration</h3>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Any Duration</option>
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>

              {/* Tour Type */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tour Type</h3>
                <div className="space-y-2">
                  {tourTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => handleTypeToggle(type)}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        selectedTypes.includes(type)
                          ? 'bg-blue-900 text-white border-blue-900'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-blue-900'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Tours Grid */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="mb-6">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled selected>Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Loading State */}
            {isSearching && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900 mx-auto"></div>
                <p className="mt-4 text-gray-600">Searching tours...</p>
              </div>
            )}

            {/* Tours Grid */}
            {!isSearching && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTours.map((tour) => (
                  <div key={tour.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                    <img 
                      src={tour.image}
                      alt={tour.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{tour.title}</h3>
                      <p className="text-gray-600 mb-4">{tour.description}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-sm text-gray-500">Duration: {tour.duration}</span>
                        <span className="text-sm text-gray-500">Difficulty: {tour.difficulty}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-900 font-bold">${tour.price}</span>
                        <Link 
                          to={`/tours/${tour.id}`}
                          className="px-4 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!isSearching && filteredTours.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No tours found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-600"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default Tours;