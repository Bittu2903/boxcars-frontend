import React from 'react';
import { X, Phone, Mail, User } from 'lucide-react';
import { Vehicle } from '../types';
import { formatPrice, formatMileage } from '../utils/formatter';

interface VehicleDetailsModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onContactDealer: () => void;
}

const VehicleDetailsModal: React.FC<VehicleDetailsModalProps> = ({ 
  vehicle, 
  onClose, 
  onContactDealer 
}) => {
  if (!vehicle) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                <div className="flex justify-between items-start">
                  <h3 className="text-2xl leading-6 font-bold text-gray-900">
                    {vehicle.make} {vehicle.model} - {vehicle.year}
                  </h3>
                  <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Vehicle Image */}
                  <div className="bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={vehicle.image}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="w-full h-64 object-contain"
                    />
                  </div>

                  {/* Vehicle Details */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-2xl font-bold text-blue-600">
                        {formatPrice(vehicle.price)}
                      </p>
                      {vehicle.badge && (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${vehicle.badge === 'Great Price' ? 'bg-green-100 text-green-800' :
                          vehicle.badge === 'Low Mileage' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                          {vehicle.badge}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Mileage</p>
                        <p className="font-medium">
                          {formatMileage(vehicle.mileage)} miles
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Fuel Type</p>
                        <p className="font-medium">{vehicle.fuelType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Transmission</p>
                        <p className="font-medium">{vehicle.transmission}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Body Type</p>
                        <p className="font-medium">{vehicle.bodyType}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Engine</p>
                        <p className="font-medium">{vehicle.engine}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Condition</p>
                        <p className="font-medium">{vehicle.condition}</p>
                      </div>
                    </div>

                    {/* Features */}
                    {vehicle.features && vehicle.features.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold mb-2">Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {vehicle.features.map((feature, index) => (
                            <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Dealer Info */}
                    {vehicle.dealer && (
                      <div className="border-t pt-4">
                        <h4 className="text-lg font-semibold mb-2">Dealer Information</h4>
                        <div className="flex items-center space-x-4">
                          <div className="bg-gray-200 rounded-full p-3">
                            <User className="h-6 w-6 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium">{vehicle.dealer.name}</p>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span>{vehicle.dealer.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <Mail className="h-4 w-4" />
                              <span>{vehicle.dealer.email}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              onClick={onContactDealer}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
            >
              Contact Dealer
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailsModal;