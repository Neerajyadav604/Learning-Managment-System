import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserEnrolledCourses } from "../../../services/operations/profileAPI"

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [enrolledCourses, setEnrolledCourses] = useState(null)
  
  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.")
    }
  };
  
  useEffect(() => {
    getEnrolledCourses();
  }, [])

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header Section */}
      <div className="mb-8 m-10">
        <h1 className="text-4xl md:text-5xl font-bold text-richblack-50 mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          My Learning Journey
        </h1>
        <p className="text-richblack-300 text-lg">Track your progress and continue where you left off</p>
      </div>

      {!enrolledCourses ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="relative">
            <div className="spinner"></div>
            <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse"></div>
          </div>
          <p className="mt-6 text-richblack-300 animate-pulse">Loading your courses...</p>
        </div>
      ) : !enrolledCourses.length ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="relative mb-8">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-richblack-700">
              <svg className="w-16 h-16 text-richblack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div className="absolute inset-0 blur-2xl bg-blue-500/10 animate-pulse"></div>
          </div>
          <h3 className="text-2xl font-semibold text-richblack-50 mb-3">No Courses Yet</h3>
          <p className="text-richblack-300 max-w-md mb-6">
            Start your learning journey today! Explore our catalog and enroll in courses that interest you.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50">
            Browse Courses
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 border border-richblack-700 rounded-2xl p-6 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300">
              <p className="text-richblack-400 text-sm mb-1">Total Courses</p>
              <p className="text-3xl font-bold text-richblack-50">{enrolledCourses.length}</p>
            </div>
            <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 border border-richblack-700 rounded-2xl p-6 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
              <p className="text-richblack-400 text-sm mb-1">In Progress</p>
              <p className="text-3xl font-bold text-richblack-50">
                {enrolledCourses.filter(c => c.progressPercentage > 0 && c.progressPercentage < 100).length}
              </p>
            </div>
            <div className="bg-gradient-to-br from-richblack-800 to-richblack-900 border border-richblack-700 rounded-2xl p-6 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300">
              <p className="text-richblack-400 text-sm mb-1">Completed</p>
              <p className="text-3xl font-bold text-richblack-50">
                {enrolledCourses.filter(c => c.progressPercentage === 100).length}
              </p>
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrolledCourses.map((course, i) => (
              <div
                key={i}
                className="group relative bg-gradient-to-br from-richblack-800 to-richblack-900 border border-richblack-700 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
              >
                {/* Progress indicator bar on top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-richblack-700">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${course.progressPercentage || 0}%` }}
                  />
                </div>

                <div
                  className="p-6 cursor-pointer"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    )
                  }}
                >
                  <div className="flex gap-4 mb-4">
                    <div className="relative flex-shrink-0">
                      <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="h-24 w-24 rounded-xl object-cover ring-2 ring-richblack-700 group-hover:ring-blue-500/50 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                        </svg>
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-richblack-50 mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {course.courseName}
                      </h3>
                      <p className="text-sm text-richblack-300 line-clamp-2">
                        {course.courseDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-richblack-700">
                    <div className="flex items-center gap-2 text-richblack-400 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{course?.totalDuration}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-semibold ${
                        course.progressPercentage === 100 
                          ? 'text-green-400' 
                          : course.progressPercentage > 0 
                          ? 'text-blue-400' 
                          : 'text-richblack-400'
                      }`}>
                        {course.progressPercentage || 0}%
                      </span>
                      <div className="w-24">
                        <ProgressBar
                          completed={course.progressPercentage || 0}
                          height="6px"
                          isLabelVisible={false}
                          bgColor={course.progressPercentage === 100 ? '#22c55e' : '#3b82f6'}
                          baseBgColor="#374151"
                          borderRadius="999px"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover effect gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}