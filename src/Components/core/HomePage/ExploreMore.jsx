import React, { useState } from "react";
import { FaCode, FaRocket, FaStar, FaUsers, FaArrowRight } from "react-icons/fa";

const tabsName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

// Sample course data
const sampleCourses = {
  "Free": [
    {
      heading: "Learn HTML",
      description: "Master the fundamentals of HTML and build your first web pages with hands-on projects.",
      level: "Beginner",
      lessionNumber: 6
    },
    {
      heading: "Learn CSS",
      description: "Create beautiful, responsive designs with modern CSS techniques and frameworks.",
      level: "Beginner",
      lessionNumber: 8
    },
    {
      heading: "Learn JavaScript",
      description: "Build interactive web applications with JavaScript fundamentals and ES6+ features.",
      level: "Beginner",
      lessionNumber: 10
    }
  ],
  "New to coding": [
    {
      heading: "Programming Basics",
      description: "Start your coding journey with fundamental programming concepts and logic.",
      level: "Beginner",
      lessionNumber: 12
    },
    {
      heading: "Web Development Intro",
      description: "Learn the basics of web development and create your first website.",
      level: "Beginner",
      lessionNumber: 9
    },
    {
      heading: "Python Fundamentals",
      description: "Master Python basics and write your first programs with this versatile language.",
      level: "Beginner",
      lessionNumber: 11
    }
  ],
  "Most popular": [
    {
      heading: "Full Stack Development",
      description: "Become a full stack developer with MERN stack expertise.",
      level: "Intermediate",
      lessionNumber: 25
    },
    {
      heading: "Data Science with Python",
      description: "Learn data analysis, visualization, and machine learning with Python.",
      level: "Advanced",
      lessionNumber: 20
    },
    {
      heading: "React Development",
      description: "Build modern web applications with React and its ecosystem.",
      level: "Intermediate",
      lessionNumber: 15
    }
  ],
  "Skills paths": [
    {
      heading: "Frontend Developer",
      description: "Master HTML, CSS, JavaScript, and modern frameworks.",
      level: "All Levels",
      lessionNumber: 30
    },
    {
      heading: "Backend Developer",
      description: "Learn server-side programming, databases, and APIs.",
      level: "Intermediate",
      lessionNumber: 28
    },
    {
      heading: "UI/UX Designer",
      description: "Create beautiful and user-friendly digital experiences.",
      level: "Beginner",
      lessionNumber: 18
    }
  ],
  "Career paths": [
    {
      heading: "Software Engineer",
      description: "Complete roadmap to becoming a professional software engineer.",
      level: "All Levels",
      lessionNumber: 50
    },
    {
      heading: "DevOps Engineer",
      description: "Learn cloud platforms, CI/CD, and automation tools.",
      level: "Advanced",
      lessionNumber: 35
    },
    {
      heading: "Mobile Developer",
      description: "Build iOS and Android apps with React Native or Flutter.",
      level: "Intermediate",
      lessionNumber: 32
    }
  ]
};

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [courses, setCourses] = useState(sampleCourses[tabsName[0]]);
  const [currentCard, setCurrentCard] = useState(sampleCourses[tabsName[0]][0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    setCourses(sampleCourses[value]);
    setCurrentCard(sampleCourses[value][0].heading);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block px-6 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-semibold mb-6">
            Explore Courses
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Unlock the{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Power of Code
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Learn to Build Anything You Can Imagine
          </p>
        </div>

        {/* Tabs Section */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {tabsName.map((tab, index) => (
            <button
              key={index}
              onClick={() => setMyCards(tab)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                currentTab === tab
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 scale-105"
                  : "bg-white text-slate-700 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 hover:shadow-lg"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              onClick={() => setCurrentCard(course.heading)}
              className={`group relative cursor-pointer transition-all duration-500 ${
                currentCard === course.heading
                  ? "scale-105"
                  : "hover:scale-105"
              }`}
            >
              {/* Card Background Glow */}
              <div className={`absolute -inset-1 rounded-3xl transition-all duration-500 ${
                currentCard === course.heading
                  ? "bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-75 blur-lg"
                  : "bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 blur-lg"
              }`}></div>

              {/* Card Content */}
              <div className={`relative h-full rounded-3xl p-8 transition-all duration-500 ${
                currentCard === course.heading
                  ? "bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-2xl"
                  : "bg-white border-2 border-slate-200 hover:border-blue-300 shadow-lg hover:shadow-2xl"
              }`}>
                
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  currentCard === course.heading
                    ? "bg-white/20 backdrop-blur-sm"
                    : "bg-gradient-to-br from-blue-500 to-indigo-600"
                }`}>
                  <FaCode className={`text-2xl ${
                    currentCard === course.heading ? "text-white" : "text-white"
                  }`} />
                </div>

                {/* Heading */}
                <h3 className={`text-2xl font-bold mb-4 ${
                  currentCard === course.heading ? "text-white" : "text-slate-900"
                }`}>
                  {course.heading}
                </h3>

                {/* Description */}
                <p className={`text-base mb-6 leading-relaxed ${
                  currentCard === course.heading ? "text-blue-100" : "text-slate-600"
                }`}>
                  {course.description}
                </p>

                {/* Divider */}
                <div className={`h-px mb-6 ${
                  currentCard === course.heading 
                    ? "bg-white/20" 
                    : "bg-slate-200"
                }`}></div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-semibold ${
                      currentCard === course.heading ? "text-blue-100" : "text-blue-600"
                    }`}>
                      {course.level}
                    </span>
                    <span className={`text-sm flex items-center gap-1 ${
                      currentCard === course.heading ? "text-blue-100" : "text-slate-500"
                    }`}>
                      <FaUsers className="text-xs" />
                      {course.lessionNumber} Lessons
                    </span>
                  </div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    currentCard === course.heading
                      ? "bg-white/20 backdrop-blur-sm group-hover:translate-x-1"
                      : "bg-blue-100 group-hover:bg-blue-200 group-hover:translate-x-1"
                  }`}>
                    <FaArrowRight className={`text-sm ${
                      currentCard === course.heading ? "text-white" : "text-blue-600"
                    }`} />
                  </div>
                </div>

                {/* Selected Badge */}
                {currentCard === course.heading && (
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                    <FaStar className="text-white text-lg" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
      
      </div>
    </div>
  );
};

export default ExploreMore;