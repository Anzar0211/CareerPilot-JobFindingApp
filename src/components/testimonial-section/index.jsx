'use client'

import { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Software Engineer",
    company: "TechCorp",
    testimonial: "CareerPilot helped me land my dream job at a top tech company. The platform made job searching so much easier!",
    rating: 5,
    avatar: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Product Manager", 
    company: "InnovateLabs",
    testimonial: "Amazing platform! Found multiple opportunities and the application process was seamless. Highly recommended!",
    rating: 5,
    avatar: "MC"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Data Scientist",
    company: "DataFlow",
    testimonial: "The best job portal I've used. Great interface, relevant job matches, and excellent support throughout.",
    rating: 5,
    avatar: "ER"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "UX Designer",
    company: "DesignStudio",
    testimonial: "CareerPilot's smart matching system connected me with the perfect role. The whole experience was fantastic!",
    rating: 5,
    avatar: "DT"
  },
  {
    id: 5,
    name: "Lisa Wang",
    role: "Marketing Manager",
    company: "GrowthCo",
    testimonial: "Professional, efficient, and user-friendly. This platform revolutionized my job search experience!",
    rating: 5,
    avatar: "LW"
  },
  {
    id: 6,
    name: "James Miller",
    role: "DevOps Engineer",
    company: "CloudTech",
    testimonial: "Found my current position through CareerPilot. The quality of job listings and ease of use is unmatched!",
    rating: 5,
    avatar: "JM"
  }
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 3 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <span className="flex justify-center items-center space-x-2 mb-4">
            <span className="block w-14 border-b-2 border-blue-600 dark:border-blue-400"></span>
            <span className="font-medium text-blue-600 dark:text-blue-400 text-lg md:text-xl">
              Success Stories
            </span>
            <span className="block w-14 border-b-2 border-blue-600 dark:border-blue-400"></span>
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover how CareerPilot has transformed careers and connected professionals with their dream opportunities
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ 
              transform: `translateX(-${currentIndex * (100 / 3)}%)`,
            }}
          >
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-3"
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 h-full border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                        {testimonial.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">
                        {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                  
                  <StarRating rating={testimonial.rating} />
                  
                  <blockquote className="mt-4 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                    "{testimonial.testimonial}"
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: testimonials.length - 2 }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                i === currentIndex 
                  ? 'bg-blue-600 dark:bg-blue-400' 
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
