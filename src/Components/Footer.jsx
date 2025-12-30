import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo/logo.png";

const Footer = () => {
  const services = [
    "Interactive Courses",
    "Live Sessions",
    "Project Based Learning",
    "Expert Mentorship",
    "Certifications",
    "Career Support"
  ];

  const company = [
    { name: "About Us", path: "/about" },
    { name: "Courses", path: "/courses" },
    { name: "Instructors", path: "/instructors" },
    { name: "Success Stories", path: "/testimonials" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" }
  ];

  return (
    <footer className="relative bg-richblack-900 text-richblack-100 pt-16 pb-8 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(139,92,246,0.3),transparent_50%)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <img src={logo} alt="StudyMate" className="h-12 mb-4" />
              <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
            </div>
            <p className="text-sm leading-relaxed text-richblack-300 mb-6">
              Your online learning companion, offering interactive courses, practical projects, and expert guidance to empower students worldwide.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Facebook, color: "hover:bg-blue-500" },
                { icon: Twitter, color: "hover:bg-blue-400" },
                { icon: Instagram, color: "hover:bg-pink-500" },
                { icon: Linkedin, color: "hover:bg-blue-600" }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href="#"
                    className={`w-10 h-10 rounded-lg bg-richblack-800 border border-richblack-700 flex items-center justify-center ${social.color} hover:border-transparent transition-all duration-300 hover:scale-110 group`}
                  >
                    <Icon className="w-4 h-4 text-richblack-300 group-hover:text-white transition-colors" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-richblack-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="text-sm text-richblack-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-richblack-700 group-hover:bg-blue-400 transition-colors"></div>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-richblack-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              Company
            </h3>
            <ul className="space-y-3">
              {company.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="text-sm text-richblack-300 hover:text-blue-400 transition-colors flex items-center gap-2 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-richblack-700 group-hover:bg-blue-400 transition-colors"></div>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 text-richblack-5 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
              Stay Updated
            </h3>
            <p className="text-sm text-richblack-300 mb-4">
              Subscribe to get the latest courses and updates
            </p>
            <div className="relative mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 pr-12 bg-richblack-800 border border-richblack-700 rounded-lg text-sm text-richblack-5 placeholder-richblack-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-all hover:scale-110 group">
                <Send className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            
            <p className="text-xs text-richblack-400 mb-3">Join 50,000+ learners</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-richblack-700 to-transparent mb-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="text-sm text-richblack-400 text-center lg:text-left">
            © {new Date().getFullYear()} StudyMate. All rights reserved.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 text-sm">
            <a
              href="#"
              className="flex items-center gap-2 text-richblack-300 hover:text-blue-400 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-richblack-800 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="hidden sm:inline">New Delhi, India</span>
            </a>

            <a
              href="mailto:hello@studymate.com"
              className="flex items-center gap-2 text-richblack-300 hover:text-blue-400 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-richblack-800 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                <Mail className="w-4 h-4" />
              </div>
              <span>hello@studymate.com</span>
            </a>

            <a
              href="tel:+13866883295"
              className="flex items-center gap-2 text-richblack-300 hover:text-blue-400 transition-colors group"
            >
              <div className="w-8 h-8 rounded-lg bg-richblack-800 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                <Phone className="w-4 h-4" />
              </div>
              <span>+1 386-688-3295</span>
            </a>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 pt-6 border-t border-richblack-800 flex flex-wrap justify-center gap-6 text-xs text-richblack-400">
          <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
          <span>•</span>
          <a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-blue-400 transition-colors">Accessibility</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;