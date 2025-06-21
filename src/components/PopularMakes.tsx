import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye, Heart } from 'lucide-react';

const PopularMakes: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('Audi');

  const tabs = ['Audi', 'Ford', 'Mercedes Benz'];

  const popularCars = [
    {
      id: '1',
      make: 'Audi',
      model: 'A5',
      year: 2023,
      price: 45000,
      originalPrice: 48000,
      mileage: 500,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      engine: '2.0 PowerPulse Momentum 5dr AWD',
      image: 'https://images.pexels.com/photos/1077785/pexels-photo-1077785.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Sale'
    },
    {
      id: '2',
      make: 'Audi',
      model: 'A4',
      year: 2022,
      price: 120000,
      mileage: 50,
      fuelType: 'Diesel',
      transmission: 'CVT',
      engine: '2.0 TG PowerPulse Momentum 5dr AWD',
      image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg?auto=compress&cs=tinysrgb&w=800',
      badge: 'Sale'
    },
    {
      id: '3',
      make: 'Audi',
      model: 'Q7',
      year: 2023,
      price: 85000,
      mileage: 1200,
      fuelType: 'Petrol',
      transmission: 'Automatic',
      engine: '3.0 PowerPulse Momentum 5dr AWD',
      image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % popularCars.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + popularCars.length) % popularCars.length);
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Popular Makes</h2>
          <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center space-x-2">
            <span>View All</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 mb-8 border-b border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-1 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Car Slider */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-750 transition-colors duration-300 group"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <img
                    src={car.image}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badge */}
                  {car.badge && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {car.badge}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-colors">
                      <Heart className="h-4 w-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    {car.make} {car.model} - {car.year}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">{car.engine}</p>

                  {/* Specifications */}
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400">
                    <span>{car.mileage} Miles</span>
                    <span>{car.fuelType}</span>
                    <span>{car.transmission}</span>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      {car.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          {formatPrice(car.originalPrice)}
                        </p>
                      )}
                      <p className="text-xl font-bold text-white">{formatPrice(car.price)}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularMakes;