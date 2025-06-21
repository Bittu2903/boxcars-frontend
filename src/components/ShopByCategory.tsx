import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const ShopByCategory: React.FC = () => {
  const categories = [
    {
      title: 'New Cars For Sale',
      active: true,
      brands: [
        'Ford Cars', 'Honda Cars', 'Hyundai Cars', 'Infiniti Cars', 'Jaguar Cars', 'Jeep Cars'
      ]
    },
    {
      title: 'Used Cars For Sale',
      active: false,
      brands: [
        'Chrysler Cars', 'Citroën Cars', 'Cupra Cars', 'Dacia Cars', 'DS Cars', 'Fiat Cars'
      ]
    },
    {
      title: 'Browse By Type',
      active: false,
      brands: [
        'Land Rover Cars', 'Lexus Cars', 'Mercedes-Benz Cars', 'Mazda Cars', 'MG Cars', 'Kia Cars'
      ]
    },
    {
      title: 'Browse By Brand',
      active: false,
      brands: [
        'Abarth Cars', 'Rimac Cars', 'Audi Cars', 'Bentley Cars', 'BMW Cars', 'Chevrolet Cars'
      ]
    }
  ];

  const rightColumnBrands = [
    'Mini Cars', 'Mitsubishi Cars', 'Nissan Cars', 'Peugeot Cars', 'Porsche Cars', 'Renault Cars'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Shop BoxCar Your Way</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
            <span>View More</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Category Tabs */}
          <div className="lg:col-span-1">
            <div className="space-y-2">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    category.active
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {category.title}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Brand Lists */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {/* Active category brands */}
              <div className="space-y-3">
                {categories[0].brands.map((brand, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="block text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                  >
                    {brand}
                  </motion.a>
                ))}
              </div>

              {/* Second column */}
              <div className="space-y-3">
                {categories[1].brands.map((brand, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.3 }}
                    className="block text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                  >
                    {brand}
                  </motion.a>
                ))}
              </div>

              {/* Third column */}
              <div className="space-y-3">
                {rightColumnBrands.map((brand, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.6 }}
                    className="block text-gray-600 hover:text-blue-600 text-sm transition-colors duration-200"
                  >
                    {brand}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;