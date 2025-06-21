import React, { useState } from 'react';
import { Heart, Eye, Fuel, Gauge, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { Vehicle } from '../types';
import { formatPrice, formatMileage } from '../utils/formatter';
import VehicleDetailsModal from './VehicleDetailsModal';
import ContactDealerModal from './ContactDealerModal';
import api from '../services/api';

interface VehicleCardProps {
  vehicle: Vehicle;
  index: number;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, index }) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [detailedVehicle, setDetailedVehicle] = useState<Vehicle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchVehicleDetails = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await api.get(`/vehicles/${vehicle.id}`);
      setDetailedVehicle(response.data.vehicle);
      setIsDetailsModalOpen(true);
    } catch (err) {
      setError('Failed to fetch vehicle details');
    } finally {
      setIsLoading(false);
    }
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
        subject: `Inquiry about ${detailedVehicle?.make} ${detailedVehicle?.model}`,
        vehicleId: vehicle.id,
        inquiryType: 'vehicle_inquiry'
      });
      setIsContactModalOpen(false);
      alert('Your inquiry has been submitted successfully!');
    } catch (err) {
      setError('Failed to submit inquiry');
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
      >
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <img
            src={vehicle.image}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Badge */}
          {vehicle.badge && (
            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${vehicle.badge === 'Great Price' ? 'bg-green-100 text-green-800' :
              vehicle.badge === 'Low Mileage' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
              {vehicle.badge}
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <Heart className="h-4 w-4 text-gray-600" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <Eye className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {vehicle.make} {vehicle.model} - {vehicle.year}
              </h3>
              <p className="text-sm text-gray-600 mt-1">{vehicle.engine}</p>
            </div>
          </div>

          {/* Specifications */}
          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Gauge className="h-4 w-4" />
              <span>{formatMileage(vehicle.mileage)} Miles</span>
            </div>
            <div className="flex items-center space-x-1">
              <Fuel className="h-4 w-4" />
              <span>{vehicle.fuelType}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Settings className="h-4 w-4" />
              <span>{vehicle.transmission}</span>
            </div>
          </div>

          {/* Price and CTA */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatPrice(vehicle.price)}</p>
            </div>
            <button
              onClick={fetchVehicleDetails}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modals */}
      {isDetailsModalOpen && detailedVehicle && (
        <VehicleDetailsModal
          vehicle={detailedVehicle}
          onClose={() => setIsDetailsModalOpen(false)}
          onContactDealer={() => {
            setIsDetailsModalOpen(false);
            setIsContactModalOpen(true);
          }}
        />
      )}

      {isContactModalOpen && detailedVehicle && (
        <ContactDealerModal
          vehicle={detailedVehicle}
          onClose={() => setIsContactModalOpen(false)}
          onSubmit={handleContactSubmit}
          error={error}
        />
      )}
    </>
  );
};

export default VehicleCard;