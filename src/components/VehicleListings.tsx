import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import VehicleCard from './VehicleCard';
import api from '../services/api';
import { Vehicle } from '../types';

const VehicleListings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('In Stock');
  const [currentPage, setCurrentPage] = useState(1); // Start with page 1
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pagination, setPagination] = useState({
    totalPages: 1,
    totalVehicles: 0,
    hasNextPage: false,
    hasPrevPage: false
  });

  const vehiclesPerPage = 5;

  const tabs = ['In Stock', 'New Cars', 'Used Cars'];

  const fetchVehicles = async (page: number) => {
    try {
      setLoading(true);
      const response = await api.get('/vehicles', {
        params: {
          page,
          limit: vehiclesPerPage,
          condition: activeTab === 'New Cars' ? 'New' : 
                   activeTab === 'Used Cars' ? 'Used' : undefined
        }
      });

      setVehicles(response.data.vehicles);
      setPagination({
        totalPages: response.data.pagination.totalPages,
        totalVehicles: response.data.pagination.totalVehicles,
        hasNextPage: response.data.pagination.hasNextPage,
        hasPrevPage: response.data.pagination.hasPrevPage
      });
    } catch (err) {
      setError('Failed to fetch vehicles');
      console.error('Error fetching vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles(currentPage);
  }, [currentPage, activeTab]);

  const nextPage = () => {
    if (currentPage < pagination.totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Explore All Vehicles</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
            <span>View All</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`pb-4 px-1 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {vehicles.map((vehicle, index) => (
            <VehicleCard key={vehicle.id || vehicle.id} vehicle={vehicle} index={index} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={prevPage}
            disabled={!pagination.hasPrevPage}
            className={`p-2 rounded-lg transition-colors ${
              !pagination.hasPrevPage
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex space-x-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === i + 1
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={nextPage}
            disabled={!pagination.hasNextPage}
            className={`p-2 rounded-lg transition-colors ${
              !pagination.hasNextPage
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default VehicleListings;