import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What our customers say</h2>
          <p className="text-gray-600">
            Rated 4.7 / 5 based on 28,370 reviews showing our 4.6 5 star reviews
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>

            <div className="flex-1 mx-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start space-x-6"
                >
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    {/* Stars */}
                    <div className="flex items-center space-x-1 mb-3">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < currentTestimonial.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium ml-2">
                        5.0
                      </span>
                    </div>

                    {/* Name and Role */}
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 uppercase tracking-wide">
                        {currentTestimonial.name}
                      </h3>
                      <p className="text-sm text-gray-600">{currentTestimonial.role}</p>
                    </div>

                    {/* Testimonial */}
                    <blockquote className="text-lg text-gray-800 leading-relaxed">
                      "{currentTestimonial.content}"
                    </blockquote>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;