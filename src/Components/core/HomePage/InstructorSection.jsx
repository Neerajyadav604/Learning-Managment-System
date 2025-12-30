import React, { useState, useEffect } from 'react';
import { FaArrowRight, FaGraduationCap, FaUsers, FaChartLine } from 'react-icons/fa';
import Instructor from "../../../assets/Images/Instructor.png"
import {Link} from "react-router-dom"
const InstructorSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: <FaUsers />, value: "50K+", label: "Active Instructors" },
    { icon: <FaGraduationCap />, value: "2M+", label: "Students Taught" },
    { icon: <FaChartLine />, value: "95%", label: "Success Rate" }
  ];

  return (
    <div className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`flex flex-col lg:flex-row gap-16 items-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Image Section with Advanced Effects */}
          <div className="lg:w-[50%] relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition duration-1000 animate-pulse"></div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <img
                src={Instructor}
                alt="Instructor teaching"
                className="relative rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500 border border-slate-700/50"
              />
              
              {/* Floating Stats Card */}
             
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-[50%] flex flex-col gap-8">
            {/* Heading with Gradient */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Become an</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                  Instructor
                </span>
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-300 leading-relaxed">
              Join a global community of educators empowering millions. We provide cutting-edge tools, 
              comprehensive support, and a platform to share your expertise with the world.
            </p>

            {/* Stats Grid */}
          

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Link to ="/signup" className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white overflow-hidden hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <span className="text-lg">Start Teaching Today</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>

              <button className="px-8 py-4 border-2 border-slate-700 rounded-xl font-semibold text-white hover:border-purple-500 hover:bg-slate-800/50 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gradient-to-br from-blue-400 to-purple-400"></div>
                ))}
              </div>
              <div className="text-sm text-slate-400">
                Trusted by <span className="text-white font-semibold">thousands</span> of educators worldwide
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default InstructorSection;