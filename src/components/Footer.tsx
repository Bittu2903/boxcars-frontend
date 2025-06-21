import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Apple, Play } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const footerSections = [
    {
      title: 'Company',
      links: ['About Us', 'Blog', 'Services', 'FAQs', 'Terms', 'Contact Us']
    },
    {
      title: 'Quick Links',
      links: ['Get in Touch', 'Help center', 'Live chat', 'How it works']
    },
    {
      title: 'Our Brands',
      links: ['Toyota', 'Porsche', 'Audi', 'BMW', 'Ford', 'Nissan', 'Peugeot', 'Volkswagen']
    },
    {
      title: 'Vehicles Type',
      links: ['Sedan', 'Hatchback', 'SUV', 'Hybrid', 'Electric', 'Coupe', 'Truck', 'Convertible']
    }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Newsletter Section */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Join BoxCar</h2>
            <p className="text-gray-400 mb-6">
              Receive pricing updates, shopping tips & more!
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">BOXCARS</h3>
              <p className="text-gray-400 text-sm mb-6">
                Find the perfect car for your needs with our extensive inventory and expert service.
              </p>
              
              {/* Mobile App Downloads */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Our Mobile App</h4>
                <div className="flex space-x-3">
                  <button className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <Apple className="h-5 w-5" />
                    <div className="text-xs text-left">
                      <p className="text-gray-400">Download on the</p>
                      <p className="font-medium">Apple Store</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <Play className="h-5 w-5" />
                    <div className="text-xs text-left">
                      <p className="text-gray-400">Get it on</p>
                      <p className="font-medium">Google Play</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="lg:col-span-1"
              >
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-400 hover:text-white text-sm transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Social Media */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h4 className="font-semibold mb-3">Connect With Us</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <a href="#" className="hover:text-white transition-colors">
                  Terms & Conditions
                </a>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Notice
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 example.com. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors flex items-center justify-center z-40"
      >
        ↑
      </button>
    </footer>
  );
};

export default Footer;