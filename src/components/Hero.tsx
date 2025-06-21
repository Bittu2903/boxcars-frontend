import React, { useState } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Vehicle } from '../types';
import api from '../services/api';
import VehicleDetailsModal from './VehicleDetailsModal';
import ContactDealerModal from './ContactDealerModal';

const Hero: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchData, setSearchData] = useState({
    make: '',
    model: '',
    priceRange: ''
  });
  const [isResultsModalOpen, setIsResultsModalOpen] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // State for vehicle details modal
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const tabs = ['All', 'New', 'Used'];
  const carTypes = ['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Hybrid'];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const params = new URLSearchParams();
      if (searchData.make) params.append('make', searchData.make);
      if (searchData.model) params.append('model', searchData.model);
      
      if (searchData.priceRange) {
        if (searchData.priceRange === '100000+') {
          params.append('minPrice', '100000');
        } else {
          const [minPrice, maxPrice] = searchData.priceRange.split('-');
          if (minPrice) params.append('minPrice', minPrice);
          if (maxPrice) params.append('maxPrice', maxPrice);
        }
      }
  
      const response = await api.get(`/vehicles?${params.toString()}`);
      setVehicles(response.data.vehicles);
      setIsResultsModalOpen(true);
    } catch (err) {
      setError('Failed to fetch vehicles. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setIsDetailsModalOpen(true);
    setIsResultsModalOpen(false);
  };

  const handleContactDealer = () => {
    setIsDetailsModalOpen(false);
    setIsContactModalOpen(true);
  };

  const handleContactSubmit = async (formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    try {
      await api.post('/contact', {
        ...formData,
        subject: `Inquiry about ${selectedVehicle?.make} ${selectedVehicle?.model}`,
        vehicleId: selectedVehicle?.id,
        inquiryType: 'vehicle_inquiry'
      });
      setIsContactModalOpen(false);
      alert('Your inquiry has been submitted successfully!');
    } catch (err) {
      setError('Failed to submit inquiry');
    }
  };

  const closeAllModals = () => {
    setIsResultsModalOpen(false);
    setIsDetailsModalOpen(false);
    setIsContactModalOpen(false);
    setSelectedVehicle(null);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg"
          alt="Mountain landscape with luxury car"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg mb-4 text-gray-200">Find cars for sale and for rent near you</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
            Find Your Perfect Car
          </h1>

          {/* Search Tabs */}
          <div className="flex justify-center mb-8">
            <div className="flex bg-black bg-opacity-20 rounded-lg p-1 backdrop-blur-sm">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab
                      ? 'bg-white text-gray-900'
                      : 'text-white hover:text-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-2xl md:rounded-full p-4 shadow-2xl max-w-4xl mx-auto"
          >
            <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {/* Make Select */}
              <div className="relative">
                <label htmlFor="make" className="sr-only">Make</label>
                <select
                  id="make"
                  className="w-full p-3 border-gray-300 md:border-r-2 rounded-lg md:rounded-r-none text-gray-900 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchData.make}
                  onChange={(e) => setSearchData({ ...searchData, make: e.target.value })}
                >
                  <option value="">Any Make</option>
                  <option value="audi">Audi</option>
                  <option value="bmw">BMW</option>
                  <option value="ford">Ford</option>
                  <option value="mercedes">Mercedes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Model Select */}
              <div className="relative">
                <label htmlFor="model" className="sr-only">Model</label>
                <select
                  id="model"
                  className="w-full p-3 border-gray-300 md:border-r-2 rounded-lg md:rounded-none text-gray-900 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchData.model}
                  onChange={(e) => setSearchData({ ...searchData, model: e.target.value })}
                >
                  <option value="">Any Model</option>
                  <option value="a4">A4</option>
                  <option value="x3">X3</option>
                  <option value="focus">Focus</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Price Range Select */}
              <div className="relative">
                <label htmlFor="price" className="sr-only">Price Range</label>
                <select
                  id="price"
                  className="w-full p-3 border-gray-300 rounded-lg md:rounded-l-none text-gray-900 appearance-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchData.priceRange}
                  onChange={(e) => setSearchData({ ...searchData, priceRange: e.target.value })}
                >
                  <option value="">All Prices</option>
                  <option value="0-25000">$0 - $25,000</option>
                  <option value="25000-50000">$25,000 - $50,000</option>
                  <option value="50000-100000">$50,000 - $100,000</option>
                  <option value="100000+">$100,000+</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Search Button */}
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg md:rounded-full hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2 w-full disabled:opacity-70"
              >
                {isLoading ? (
                  <span>Searching...</span>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Search Cars</span>
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Featured Car Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-4"
          >
            <p className="text-sm backdrop-blur-sm text-white px-4 py-2 rounded-lg">Or Browse Featured Model</p>
          </motion.div>

          {/* Car Type Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            {carTypes.map((type) => (
              <button
                key={type}
                className="bg-black bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white hover:text-gray-900 transition-all duration-200"
              >
                {type}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Results Modal */}
      {isResultsModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-900 bg-opacity-75" onClick={closeAllModals}></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Search Results ({vehicles.length} vehicles found)
                  </h3>
                  <button
                    onClick={closeAllModals}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {error && (
                  <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
                    {error}
                  </div>
                )}

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {vehicles.length > 0 ? (
                    vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-48 bg-gray-200 overflow-hidden">
                          <img
                            src={vehicle.image || 'https://via.placeholder.com/300'}
                            alt={`${vehicle.make} ${vehicle.model}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="text-lg font-semibold">
                            {vehicle.make} {vehicle.model} ({vehicle.year})
                          </h4>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-blue-600 font-bold">
                              ${vehicle.price.toLocaleString()}
                            </span>
                            <span className="text-gray-500 text-sm">
                              {vehicle.mileage.toLocaleString()} miles
                            </span>
                          </div>
                          <button 
                            onClick={() => handleViewDetails(vehicle)}
                            className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    !error && (
                      <div className="col-span-full text-center py-12 text-gray-500">
                        No vehicles found matching your criteria.
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={closeAllModals}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Details Modal */}
      {isDetailsModalOpen && selectedVehicle && (
        <VehicleDetailsModal
          vehicle={selectedVehicle}
          onClose={closeAllModals}
          onContactDealer={handleContactDealer}
        />
      )}

      {/* Contact Dealer Modal */}
      {isContactModalOpen && selectedVehicle && (
        <ContactDealerModal
          vehicle={selectedVehicle}
          onClose={closeAllModals}
          onSubmit={handleContactSubmit}
          error={error}
        />
      )}
    </section>
  );
};

export default Hero;