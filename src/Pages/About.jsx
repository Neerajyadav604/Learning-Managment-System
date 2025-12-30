import React, { useState, useEffect } from "react";
import { FaEye, FaRocket, FaStar, FaUsers, FaGraduationCap, FaAward } from "react-icons/fa";
import ReviewSlider from "../components/Common/ReviewSlider"
import Learning1 from "../assets/Images/aboutus.png" 
import Learning2 from "../assets/Images/aboutus2.png"
import Learning3 from "../assets/Images/aboutus3.png"
import Foundingstory from  "../assets/Images/FoundingStory.png"

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: <FaUsers />, value: "10K+", label: "Active Learners" },
    { icon: <FaGraduationCap />, value: "500+", label: "Expert Instructors" },
    { icon: <FaAward />, value: "1000+", label: "Courses Available" },
    { icon: <FaStar />, value: "4.9/5", label: "Average Rating" }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-900 overflow-hidden">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 lg:py-32">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block px-6 py-2 bg-white/20 border border-white/30 rounded-full text-white text-sm font-semibold mb-6 backdrop-blur-sm">
              About StudyMate
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white">
              Driving Innovation in{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-300 bg-clip-text text-transparent">
                Online Education
              </span>
            </h1>
            
            <p className="text-xl text-blue-50 max-w-4xl mx-auto leading-relaxed mb-16">
              We're passionate about creating a brighter future by offering cutting-edge courses, 
              leveraging emerging technologies, and nurturing a vibrant learning community.
            </p>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[Learning1, Learning2, Learning3].map((img, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-2xl">
                  <img 
                    src={img}
                    alt={`Learning ${i + 1}`}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative py-20 border-y border-slate-200">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative">
          <blockquote className="text-3xl lg:text-4xl font-semibold text-slate-700 leading-relaxed">
            "We are passionate about revolutionizing the way we learn. Our innovative platform 
            <span className="text-blue-600"> combines technology</span>, 
            <span className="text-indigo-600"> expertise</span>, and 
            <span className="text-purple-600"> community </span>
            to create an unparalleled educational experience."
          </blockquote>
        </div>
      </section>

      {/* Founding Story Section */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Content */}
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 text-blue-600 mb-4">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  <span className="text-sm font-semibold tracking-wider uppercase">Our Story</span>
                </div>
                <h2 className="text-5xl lg:text-6xl font-bold mb-6">
                  <span className="bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Founding Story
                  </span>
                </h2>
              </div>

              <div className="space-y-6 text-slate-600 text-lg leading-relaxed">
                <p>
                  Our e-learning platform was born out of a shared vision and passion for transforming education. 
                  It all began with a group of educators, technologists, and lifelong learners who recognized 
                  the need for accessible, flexible, and high-quality learning opportunities.
                </p>
                <p>
                  As experienced educators ourselves, we witnessed firsthand the limitations of traditional 
                  education systems. We believed that education should not be confined to the walls of a 
                  classroom or restricted by geographical boundaries.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
              <div className="relative">
                <img
                  src={Foundingstory}
                  alt="Founding Story"
                  className="rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 rounded-3xl"></div>
              </div>
            </div>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid lg:grid-cols-2 gap-8 mt-24">
            
            {/* Vision Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-10 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 h-full">
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
                    <FaEye className="text-white text-2xl" />
                  </div>
                  
                  <h3 className="text-4xl font-bold">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      Our Vision
                    </span>
                  </h3>
                  
                  <p className="text-slate-700 text-lg leading-relaxed">
                    With this vision in mind, we set out on a journey to create an e-learning platform 
                    that would revolutionize the way people learn. Our team of dedicated experts worked 
                    tirelessly to develop a robust and intuitive platform that combines cutting-edge 
                    technology with engaging content.
                  </p>
                </div>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 rounded-3xl p-10 hover:border-indigo-300 hover:shadow-2xl transition-all duration-500 h-full">
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-200/30 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
                    <FaRocket className="text-white text-2xl" />
                  </div>
                  
                  <h3 className="text-4xl font-bold">
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                      Our Mission
                    </span>
                  </h3>
                  
                  <p className="text-slate-700 text-lg leading-relaxed">
                    Our mission goes beyond just delivering courses online. We wanted to create a vibrant 
                    community of learners, where individuals can connect, collaborate, and learn from one 
                    another. We believe that knowledge thrives in an environment of sharing and dialogue.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 border-y border-slate-200">
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Impact</span>
            </h2>
            <p className="text-slate-600 text-lg">Numbers that speak for themselves</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div 
                key={idx}
                className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 rounded-2xl transition-all duration-300"></div>
                
                <div className="relative text-center space-y-4">
                  <div className="text-4xl text-blue-600 mx-auto group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 text-sm font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Features Grid */}
      <section className="py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              World-Class <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Learning</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Experience education like never before with our innovative approach
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Expert Instructors", desc: "Learn from industry professionals", icon: "👨‍🏫" },
              { title: "Flexible Learning", desc: "Study at your own pace", icon: "⏰" },
              { title: "Interactive Content", desc: "Engage with hands-on projects", icon: "💡" },
              { title: "Global Community", desc: "Connect with learners worldwide", icon: "🌍" },
              { title: "Certificates", desc: "Earn recognized certifications", icon: "🎓" },
              { title: "24/7 Support", desc: "Get help whenever you need", icon: "💬" }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="group bg-gradient-to-br from-white to-blue-50/30 border border-slate-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        
        <div className="max-w-7xl mx-auto px-4 relative text-center">
          <div className="inline-block px-6 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-6">
            Testimonials
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-16">
            What Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Learners Say</span>
          </h2>
          <ReviewSlider/>
          
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0">
              <div className="absolute top-10 right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>
            </div>
            
            <div className="relative">
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Transform Your Learning?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of learners who are already advancing their careers with StudyMate
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105">
                  Get Started Free
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;