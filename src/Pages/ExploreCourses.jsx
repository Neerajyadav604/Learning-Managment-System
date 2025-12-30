// import React, { useEffect, useState } from "react";
// import { getAllCourses } from "../services/operations/courseDetailsAPI";
// import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate, useParams } from "react-router-dom"
// import { buyCourse } from "../services/operations/studentFeaturesAPI"

// const ExploreCourses = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [courses, setCourses] = useState([]);
//   const [confirmationModal, setConfirmationModal] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("all");
  
//   const { user } = useSelector((state) => state.profile)
//   const { token } = useSelector((state) => state.auth)
//   const { loading } = useSelector((state) => state.profile)
//   const { paymentLoading } = useSelector((state) => state.course)
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await getAllCourses();
//         setCourses(res);
//         console.log(res);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   const handleBuyCourse = (courseId) => {
//     if (token) {
//       buyCourse(token, [courseId], user, navigate, dispatch);
//       return;
//     }
//     setConfirmationModal({
//       text1: "You are not logged in!",
//       text2: "Please login to Purchase Course.",
//       btn1Text: "Login",
//       btn2Text: "Cancel",
//       btn1Handler: () => navigate("/login"),
//       btn2Handler: () => setConfirmationModal(null),
//     });
//   };
// console.log(courses)
//   const filteredCourses = courses.filter((course) => {
//     const matchesSearch = course.courseName?.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesSearch;
//   });

//   if (paymentLoading) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900">
//         <div className="flex flex-col items-center gap-6">
//           <div className="relative h-20 w-20">
//             <div className="absolute inset-0 rounded-full border-4 border-richblack-600"></div>
//             <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-yellow-100 border-r-caribbeangreen-200"></div>
//           </div>
//           <div className="space-y-2 text-center">
//             <p className="text-xl font-semibold text-richblack-5">Processing payment...</p>
//             <p className="text-sm text-richblack-300">Please wait while we confirm your purchase</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900">
//       {/* Hero Section */}
//       <div className="relative overflow-hidden border-b border-richblack-700">
//         {/* Background decoration */}
//         <div className="absolute inset-0 bg-gradient-to-br from-caribbeangreen-900/10 via-transparent to-yellow-900/10"></div>
//         <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-caribbeangreen-500/5 blur-3xl"></div>
//         <div className="absolute -left-20 top-40 h-64 w-64 rounded-full bg-yellow-500/5 blur-3xl"></div>
        
//         <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//           <div className="space-y-6 text-center">
//             <div className="inline-flex items-center gap-2 rounded-full bg-caribbeangreen-900/20 px-4 py-2 backdrop-blur-sm">
//               <div className="h-2 w-2 animate-pulse rounded-full bg-caribbeangreen-200"></div>
//               <span className="text-sm font-medium text-caribbeangreen-200">
//                 {courses.length} Courses Available
//               </span>
//             </div>
            
//             <h1 className="bg-gradient-to-r from-richblack-5 via-richblack-25 to-richblack-5 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl lg:text-7xl">
//               Explore Our Courses
//             </h1>
            
//             <p className="mx-auto max-w-2xl text-lg text-richblack-300">
//               Discover world-class learning experiences designed to help you master new skills and advance your career
//             </p>
//           </div>

//           {/* Search Bar */}
//           <div className="mx-auto mt-10 max-w-2xl">
//             <div className="group relative">
//               <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-caribbeangreen-200 to-yellow-100 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20"></div>
//               <div className="relative flex items-center gap-3 rounded-2xl bg-richblack-800 p-2 shadow-2xl backdrop-blur-sm transition-all duration-300 group-hover:shadow-caribbeangreen-200/10">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-caribbeangreen-200 to-caribbeangreen-300">
//                   <svg
//                     className="h-5 w-5 text-richblack-900"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                     />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search for courses..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="flex-1 bg-transparent px-2 text-richblack-5 placeholder-richblack-400 outline-none"
//                 />
//                 {searchQuery && (
//                   <button
//                     onClick={() => setSearchQuery("")}
//                     className="mr-2 rounded-lg p-2 text-richblack-400 transition-colors hover:bg-richblack-700 hover:text-richblack-5"
//                   >
//                     <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
//         {isLoading && (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 className="animate-pulse rounded-3xl bg-richblack-800 p-6"
//               >
//                 <div className="mb-6 h-48 rounded-2xl bg-richblack-700"></div>
//                 <div className="space-y-4">
//                   <div className="h-8 w-24 rounded-lg bg-richblack-700"></div>
//                   <div className="h-12 rounded-xl bg-richblack-700"></div>
//                   <div className="h-12 rounded-xl bg-richblack-700"></div>
//                   <div className="h-32 rounded-xl bg-richblack-700"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {!isLoading && filteredCourses.length === 0 && (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-richblack-800">
//               <svg
//                 className="h-12 w-12 text-richblack-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//             </div>
//             <h3 className="mb-2 text-2xl font-bold text-richblack-5">
//               {searchQuery ? "No courses found" : "No courses available"}
//             </h3>
//             <p className="mb-6 text-richblack-300">
//               {searchQuery
//                 ? "Try adjusting your search terms"
//                 : "Check back later for new courses"}
//             </p>
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="rounded-xl bg-gradient-to-r from-caribbeangreen-200 to-caribbeangreen-300 px-6 py-3 font-semibold text-richblack-900 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-caribbeangreen-200/50"
//               >
//                 Clear Search
//               </button>
//             )}
//           </div>
//         )}

//         {!isLoading && filteredCourses.length > 0 && (
//           <div className="space-y-6">
//             <div className="flex items-center justify-between">
//               <p className="text-richblack-300">
//                 Showing <span className="font-semibold text-richblack-5">{filteredCourses.length}</span> {filteredCourses.length === 1 ? 'course' : 'courses'}
//               </p>
//             </div>

//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//               {filteredCourses.map((course, index) => (
//                 <div
//                   key={course._id}
//                   className="animate-fadeIn"
//                   style={{ animationDelay: `${index * 50}ms` }}
//                 >
//                   <CourseDetailsCard
//                     course={course}
//                     setConfirmationModal={setConfirmationModal}
//                     handleBuyCourse={() => handleBuyCourse(course._id)}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-out forwards;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ExploreCourses;