import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { brands } from '../data/brands';

const BrandShowcase: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Explore Our Premium Brands
          </h2>
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
            <span className="font-medium">Show All Brands</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand, index) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-gray-50 rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors duration-200 group-hover:shadow-lg">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-200">
                  {brand.logo}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{brand.name}</h3>
                <p className="text-sm text-gray-600">{brand.vehicleCount} vehicles</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;