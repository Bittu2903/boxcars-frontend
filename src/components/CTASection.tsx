import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Car, DollarSign } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Looking for a Car */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Are You Looking</h3>
                  <h3 className="text-xl font-bold">For a Car?</h3>
                </div>
              </div>
              
              <p className="text-blue-100 mb-6 text-sm">
                We are committed to providing our customers with exceptional service.
              </p>
              
              <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mb-16 -mr-16"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mt-10 -mr-10"></div>
            
            {/* Car Icon */}
            <div className="absolute bottom-4 right-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <div className="text-2xl">🚗</div>
              </div>
            </div>
          </motion.div>

          {/* Want to Sell */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Do You Want to</h3>
                  <h3 className="text-xl font-bold">Sell a Car?</h3>
                </div>
              </div>
              
              <p className="text-purple-100 mb-6 text-sm">
                We are committed to providing our customers with exceptional service.
              </p>
              
              <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mb-16 -mr-16"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white bg-opacity-10 rounded-full -mt-10 -mr-10"></div>
            
            {/* Money Icon */}
            <div className="absolute bottom-4 right-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <div className="text-2xl">💰</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;