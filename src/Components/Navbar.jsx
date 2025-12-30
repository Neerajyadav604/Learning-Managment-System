import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import logo from "../assets/Logo/logo.png";
import { NavbarLinks } from "../data/Navbar-links";
import ProfileDropDown from "../core/ProfileDropDown.jsx";
import { apiconnector } from "../services/Apiconector";
import { categories } from "../services/apis";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [sublink, setSublink] = useState([]);

  async function fetchSublinks() {
    try {
      const result = await apiconnector("GET", categories.CATEGORIES_API);
      setSublink(result?.data?.data || []);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchSublinks();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const matchroutes = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-richblack-900/95 backdrop-blur-xl shadow-xl border-b border-richblack-800" 
        : "bg-richblack-900 border-b border-richblack-800/50"
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-6 h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-10 transition-transform duration-300 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-2">
          {NavbarLinks.map((link, index) => (
            <li key={index}>
              {link.title === "Catalog" ? (
                <div className="relative group">
                  <button className="flex items-center gap-1 px-4 py-2 rounded-lg text-richblack-25 hover:text-blue-400 hover:bg-richblack-800/50 transition-all duration-200">
                    <span className="font-medium">{link.title}</span>
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-richblack-800 border border-richblack-700 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 -translate-y-2">
                    {/* Arrow */}
                    <div className="absolute -top-2 left-6 w-4 h-4 bg-richblack-800 border-l border-t border-richblack-700 rotate-45"></div>
                    
                    {/* Content */}
                    <div className="relative p-2 max-h-96 overflow-y-auto custom-scrollbar">
                      {sublink.length > 0 ? (
                        <div className="space-y-1">
                          {sublink.map((item, i) => (
                            <Link
                              key={i}
                              to={`/catalog/${item.name}`}
                              className="block px-4 py-2.5 rounded-lg text-richblack-100 hover:bg-richblack-700 hover:text-blue-400 transition-all duration-200 group/item"
                            >
                              <span className="font-medium">{item.name}</span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="px-4 py-3 text-richblack-400 text-sm">No categories found</p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  to={link?.path}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    matchroutes(link?.path)
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-richblack-25 hover:text-blue-400 hover:bg-richblack-800/50"
                  }`}
                >
                  {link.title}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center gap-3">
          {user && user?.accountType !== "Instructor" && (
            <Link 
              to="/dashboard/cart" 
              className="relative p-2 rounded-lg hover:bg-richblack-800 transition-all duration-200 group"
            >
              <ShoppingCart className="w-5 h-5 text-richblack-25 group-hover:text-blue-400 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-blue-500 to-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-richblack-900 animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-richblack-25 font-medium border border-richblack-700 rounded-lg hover:bg-richblack-800 transition-all"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <ProfileDropDown />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-richblack-800 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="w-6 h-6 text-richblack-25" />
          ) : (
            <Menu className="w-6 h-6 text-richblack-25" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden border-t border-richblack-800 bg-richblack-900 animate-slideDown">
          <div className="px-4 py-6 space-y-4">
            {NavbarLinks.map((link, index) => (
              <div key={index}>
                {link.title === "Catalog" ? (
                  <div className="space-y-2">
                    <p className="px-4 py-2 text-richblack-25 font-medium">{link.title}</p>
                    <div className="pl-4 space-y-1 bg-richblack-800 rounded-lg p-2">
                      {sublink.length > 0 ? (
                        sublink.map((item, i) => (
                          <Link
                            key={i}
                            to={`/catalog/${item.name}`}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 rounded-lg text-richblack-100 hover:bg-richblack-700 hover:text-blue-400 transition-all"
                          >
                            {item.name}
                          </Link>
                        ))
                      ) : (
                        <p className="px-4 py-2 text-richblack-400 text-sm">No categories</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link
                    to={link?.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                      matchroutes(link?.path)
                        ? "text-blue-400 bg-blue-500/10"
                        : "text-richblack-25 hover:bg-richblack-800"
                    }`}
                  >
                    {link.title}
                  </Link>
                )}
              </div>
            ))}

            {user && user?.accountType !== "Instructor" && (
              <Link
                to="/dashboard/cart"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-richblack-25 hover:bg-richblack-800 transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {totalItems > 0 && (
                  <span className="ml-auto bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {token === null && (
              <div className="flex flex-col gap-2 pt-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-center text-richblack-25 font-medium border border-richblack-700 rounded-lg hover:bg-richblack-800 transition-all"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {token !== null && (
              <div className="pt-4">
                <ProfileDropDown />
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(44, 51, 63, 0.5);
          border-radius: 2px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(62, 76, 89, 0.7);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;