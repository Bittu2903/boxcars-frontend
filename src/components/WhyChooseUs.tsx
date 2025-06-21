import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Diamond, DollarSign, Wrench } from 'lucide-react';

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <Diamond className="h-8 w-8 text-blue-600" />,
      title: 'Special Financing Offers',
      description: 'Our stress-free finance department that can find financial solutions to save you money.'
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Trusted Car Dealership',
      description: 'Our stress-free finance department that can find financial solutions to save you money.'
    },
    {
      icon: <DollarSign className="h-8 w-8 text-blue-600" />,
      title: 'Transparent Pricing',
      description: 'Our stress-free finance department that can find financial solutions to save you money.'
    },
    {
      icon: <Wrench className="h-8 w-8 text-blue-600" />,
      title: 'Expert Car Service',
      description: 'Our stress-free finance department that can find financial solutions to save you money.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors duration-200">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;