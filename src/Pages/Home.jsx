import React, { useEffect, useRef } from "react";

import Typed from "typed.js";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Check, TrendingUp, Search, Award } from "lucide-react";
import college from "../assets/college.png";
import comma from "../assets/comma.png";
import learn from "../assets/learn.png";
import practice from "../assets/practice.png";
import grow from "../assets/grow.png";
import mern from "../assets/mern.png";
import rupee from "../assets/rupee.png";
import python from "../assets/python.png";
import java from "../assets/java.png";
import ai from "../assets/ai.png";
import ds from "../assets/ds.png";
import success from "../assets/success.png";
import s1 from "../assets/s1.png";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";
import Footer from "../components/Footer"
import ReviewSlider from "../components/Common/ReviewSlider"
 import InstructorSection from "../components/core/HomePage/InstructorSection"
  import ExploreMore from "../components/core/HomePage/ExploreMore"

const Home = () => {
  const typedEl = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedEl.current, {
      strings: [
        "Learn Anytime, Anywhere",
        "Interactive Online Classes",
        "Expert-Led Courses",
        "Personalized Learning Paths",
        "Skill-Based Certifications",
        "Empowering Lifelong Learners",
        "Your Future Starts Here"
      ],
      loop: true,
      typeSpeed: 100,
      backSpeed: 60,
      backDelay: 1200,
    });
    return () => typed.destroy();
  }, []);

  const offers = [
    { img: learn, text: "Access world-class content", delay: "0ms" },
    { img: practice, text: "Build real skills through interactive lessons", delay: "100ms" },
    { img: grow, text: "Achieve your dreams", delay: "200ms" }
  ];

  

  const benefits = [
    "Cost-effective compared to traditional learning",
    "Saves time and money on transportation and accommodation",
    "Pre-recorded lectures scale to thousands of students",
    "Faster learners can complete courses at their own pace"
  ];

  const features = [
    { icon: Search, title: "Course Library & Search", desc: "Explore thousands of courses across multiple domains" },
    { icon: TrendingUp, title: "Progress Tracking", desc: "Monitor your learning journey with detailed analytics" },
    { icon: Award, title: "Smart Recommendations", desc: "Get personalized course suggestions based on your interests" }
  ];

  const testimonials = [
    { img: s1, text: "This platform has completely changed the way I learn. The interactive lessons keep me motivated.", name: "Sarah Johnson" },
    { img: s2, text: "I love how easy it is to access courses on my phone. Learning on the go is simple.", name: "Michael Chen" },
    { img: s3, text: "The live classes and community make it feel like I'm never learning alone. Highly recommend!", name: "Emily Davis" }
  ];

  return (
    <div className="relative w-full bg-richblack-900 mt-16">
      {/* Hero Section */}
      <div className="relative h-[600px] lg:h-[700px] overflow-hidden">
        <img src={college} alt="Hero" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-richblack-900/90 via-richblack-900/70 to-richblack-900"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-gradient"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
          <div className="animate-fadeIn">
            <p className="text-richblack-100 text-lg md:text-xl font-medium mb-6 tracking-wide">
              Welcome to{" "}
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                STUDYMATE
              </span>
            </p>
          </div>
          
          <div className="mb-8 animate-fadeInUp">
            <h1 className="text-white text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 tracking-tight">
              Empowering
            </h1>
            <h1
              ref={typedEl}
              className="text-transparent bg-clip-text bg-blue-600 text-3xl sm:text-5xl lg:text-6xl font-bold min-h-[1.2em]"
            ></h1>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 animate-fadeInUp" style={{animationDelay: "0.3s"}}>
            <Link 
              to="/signup" 
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-2xl shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center"
            >
              Start Learning
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-richblack-900 to-richblack-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-richblack-5 mb-4">
              Why Choose Us
            </h2>
            <p className="max-w-2xl mx-auto text-richblack-300 text-lg">
              Transform your learning experience with our innovative platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 border border-richblack-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{animationDelay: offer.delay}}
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all"></div>
                  <img src={offer.img} alt="offer" className="h-24 w-24 mx-auto relative z-10 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-xl font-semibold text-richblack-5 text-center">
                  {offer.text}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-6 bg-richblack-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-4 text-richblack-5">
            Popular Courses
          </h2>
          <p className="text-center text-richblack-300 mb-12 text-lg">
            Master in-demand skills with our expert-led courses
          </p>
          
        <ExploreMore/>
          
        
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-richblack-800 to-richblack-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-3xl group-hover:blur-2xl transition-all"></div>
              <img src={success} className="relative w-full rounded-3xl shadow-2xl border border-richblack-700" alt="success" />
            </div>
            
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-richblack-5">
                Why Learn With Us
              </h2>
              <p className="mb-8 text-lg text-richblack-300">
                Personalized, engaging lessons designed to help every learner succeed
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl bg-richblack-800/50 border border-richblack-700 hover:border-blue-500/50 transition-all hover:scale-105"
                  >
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-richblack-100">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-richblack-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-richblack-5 mb-4">
              Powerful Features
            </h2>
            <p className="text-richblack-300 text-lg">
              Everything you need for a seamless learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="group p-8 rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 border border-richblack-700 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-richblack-5 text-center mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-richblack-300 text-center text-sm">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <InstructorSection/>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-gradient-to-b from-richblack-900 to-richblack-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-richblack-5">
                What Our<br />Learners Say
              </h2>
              <p className="text-lg text-richblack-300 max-w-md">
                Join thousands of satisfied learners who have transformed their careers with our platform
              </p>
            </div>
            
            {/* <div className="space-y-6">
              {testimonials.map((testimonial, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 p-6 rounded-2xl bg-richblack-900 border border-richblack-700 hover:border-blue-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className={`w-1 h-full rounded-full ${i === 1 ? "bg-gradient-to-b from-blue-500 to-purple-600" : "bg-richblack-700"}`}></div>
                  <img
                    src={testimonial.img}
                    alt="student"
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-richblack-700 group-hover:ring-blue-500 transition-all"
                  />
                  <div className="flex-1">
                    <p className="text-richblack-100 mb-2">"{testimonial.text}"</p>
                    <p className="text-sm font-semibold text-blue-400">{testimonial.name}</p>
                  </div>
                  <img src={comma} className="h-6 w-6 opacity-30" alt="quote" />
                </div>
              ))}
            </div> */}
            <ReviewSlider/>
          </div>
        </div>
      </section>
      <Footer/>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes gradient {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }

        .animate-fadeInUp {
          animation: fadeInUp 1s ease-out;
        }

        .animate-gradient {
          animation: gradient 8s ease-in-out infinite;
        }
      `}</style>
    </div>
    
  );
};


export default Home;













































































// // Icons Import
// import { FaArrowRight } from "react-icons/fa"
// import { Link } from "react-router-dom"

// // Image and Video Import
// import Banner from "../assets/Images/banner.mp4"
// // Component Imports
// import Footer from "../components/Footer"
// import ReviewSlider from "../components/Common/ReviewSlider"
// import CTAButton from "../components/core/HomePage/Button"
// import CodeBlocks from "../components/core/HomePage/CodeBlocks"
// import ExploreMore from "../components/core/HomePage/ExploreMore"
// import HighlightText from "../components/core/HomePage/HighlightText"
// import InstructorSection from "../components/core/HomePage/InstructorSection"
// import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
// import TimelineSection from "../components/core/HomePage/TimelineSection"

// function Home() {
//   return (
//     <div>
//       {/* Section 1 */}
//       <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
//         {/* Become a Instructor Button */}
//         <Link to={"/signup"}>
//           <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
//             <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
//               <p>Become an Instructor</p>
//               <FaArrowRight />
//             </div>
//           </div>
//         </Link>

//         {/* Heading */}
//         <div className="text-center text-4xl font-semibold">
//           Empower Your Future with
//           <HighlightText text={"Coding Skills"} />
//         </div>

//         {/* Sub Heading */}
//         <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
//           With our online coding courses, you can learn at your own pace, from
//           anywhere in the world, and get access to a wealth of resources,
//           including hands-on projects, quizzes, and personalized feedback from
//           instructors.
//         </div>

//         {/* CTA Buttons */}
//         <div className="mt-8 flex flex-row gap-7">
//           <CTAButton active={true} linkto={"/signup"}>
//             Learn More
//           </CTAButton>
//           <CTAButton active={false} linkto={"/login"}>
//             Book a Demo
//           </CTAButton>
//         </div>

//         {/* Video */}
//         <div className="mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
//           <video
//             className="shadow-[20px_20px_rgba(255,255,255)]"
//             muted
//             loop
//             autoPlay
//           >
//             <source src={Banner} type="video/mp4" />
//           </video>
//         </div>

//         {/* Code Section 1  */}
//         <div>
//           <CodeBlocks
//             position={"lg:flex-row"}
//             heading={
//               <div className="text-4xl font-semibold">
//                 Unlock your
//                 <HighlightText text={"coding potential"} /> with our online
//                 courses.
//               </div>
//             }
//             subheading={
//               "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
//             }
//             ctabtn1={{
//               btnText: "Try it Yourself",
//               link: "/signup",
//               active: true,
//             }}
//             ctabtn2={{
//               btnText: "Learn More",
//               link: "/signup",
//               active: false,
//             }}
//             codeColor={"text-yellow-25"}
//             codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
//             backgroundGradient={<div className="codeblock1 absolute"></div>}
//           />
//         </div>

//         {/* Code Section 2 */}
//         <div>
//           <CodeBlocks
//             position={"lg:flex-row-reverse"}
//             heading={
//               <div className="w-[100%] text-4xl font-semibold lg:w-[50%]">
//                 Start
//                 <HighlightText text={"coding in seconds"} />
//               </div>
//             }
//             subheading={
//               "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
//             }
//             ctabtn1={{
//               btnText: "Continue Lesson",
//               link: "/signup",
//               active: true,
//             }}
//             ctabtn2={{
//               btnText: "Learn More",
//               link: "/signup",
//               active: false,
//             }}
//             codeColor={"text-white"}
//             codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
//             backgroundGradient={<div className="codeblock2 absolute"></div>}
//           />
//         </div>

//         {/* Explore Section */}
//         <ExploreMore />
//       </div>

//       {/* Section 2 */}
//       <div className="bg-pure-greys-5 text-richblack-700">
//         <div className="homepage_bg h-[320px]">
//           {/* Explore Full Catagory Section */}
//           <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
//             <div className="lg:h-[150px]"></div>
//             <div className="flex flex-row gap-7 text-white lg:mt-8">
//               <CTAButton active={true} linkto={"/signup"}>
//                 <div className="flex items-center gap-2">
//                   Explore Full Catalog
//                   <FaArrowRight />
//                 </div>
//               </CTAButton>
//               <CTAButton active={false} linkto={"/login"}>
//                 Learn More
//               </CTAButton>
//             </div>
//           </div>
//         </div>

//         <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
//           {/* Job that is in Demand - Section 1 */}
//           <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
//             <div className="text-4xl font-semibold lg:w-[45%] ">
//               Get the skills you need for a{" "}
//               <HighlightText text={"job that is in demand."} />
//             </div>
//             <div className="flex flex-col items-start gap-10 lg:w-[40%]">
//               <div className="text-[16px]">
//                 The modern StudyNotion is the dictates its own terms. Today, to
//                 be a competitive specialist requires more than professional
//                 skills.
//               </div>
//               <CTAButton active={true} linkto={"/signup"}>
//                 <div className="">Learn More</div>
//               </CTAButton>
//             </div>
//           </div>

//           {/* Timeline Section - Section 2 */}
//           <TimelineSection />

//           {/* Learning Language Section - Section 3 */}
//           <LearningLanguageSection />
//         </div>
//       </div>

//       {/* Section 3 */}
//       <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
//         {/* Become a instructor section */}
//         <InstructorSection />

//         {/* Reviws from Other Learner */}
//         <h1 className="text-center text-4xl font-semibold mt-8">
//           Reviews from other learners
//         </h1>
//         <ReviewSlider />
//       </div>

//       {/* Footer */}
//       <Footer />
//     </div>
//   )
// }

// export default Home