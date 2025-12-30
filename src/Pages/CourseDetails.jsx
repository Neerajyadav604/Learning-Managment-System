import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt, HiSparkles } from "react-icons/hi"
import ReactMarkdown from "react-markdown"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/Common/ConfirmationModal"
import Footer from "../components/Footer"
import RatingStars from "../components/Common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avgRating"
import Error from "./Error"

function CourseDetails() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { courseId } = useParams()
  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res)
        setTimeout(() => setIsVisible(true), 100)
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  const [avgReviewCount, setAvgReviewCount] = useState(0)
  useEffect(() => {
    const count = GetAvgRating(response?.data?.courseDetails.ratingAndReviews)
    setAvgReviewCount(count)
  }, [response])

  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
  useEffect(() => {
    let lectures = 0
    response?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures)
  }, [response])

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner"></div>
          <p className="text-richblack-300 animate-pulse">Loading course details...</p>
        </div>
      </div>
    )
  }

  if (!response.success) {
    return <Error />
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = response.course

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900">
        <div className="flex flex-col items-center gap-4">
          <div className="spinner"></div>
          <p className="text-richblack-300 animate-pulse">Processing payment...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero Section with Gradient Background */}
      <div className="relative w-full bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Breadcrumb or Badge */}
            <div className="flex items-center gap-2 mb-6 mt-16">
              <span className="inline-flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                <HiSparkles className="w-4 h-4" />
                Featured Course
              </span>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              
              {/* Left Column - Course Info */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Title & Description */}
                <div className="space-y-6">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight">
                    {courseName}
                  </h1>

                  <p className="text-xl text-richblack-100 leading-relaxed">
                    {courseDescription}
                  </p>

                  {/* Stats Row */}
                  <div className="flex flex-wrap items-center gap-4 text-base">
                    <div className="flex items-center gap-2 bg-richblack-700/50 px-4 py-2 rounded-lg border border-richblack-600">
                      <span className="text-yellow-50 font-bold text-lg">{avgReviewCount}</span>
                      <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                      <span className="text-richblack-200">({ratingAndReviews.length})</span>
                    </div>
                    <div className="flex items-center gap-2 bg-richblack-700/50 px-4 py-2 rounded-lg border border-richblack-600">
                      <span className="text-richblack-200">{studentsEnrolled.length} students</span>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="flex flex-col gap-3 text-base text-richblack-200">
                    <p className="flex items-center gap-2">
                      <span className="font-semibold text-richblack-5">Created by</span>
                      <span className="text-blue-200">{`${instructor.firstName} ${instructor.lastName}`}</span>
                    </p>
                    <div className="flex flex-wrap gap-5">
                      <p className="flex items-center gap-2">
                        <BiInfoCircle className="w-5 h-5 text-blue-400" />
                        {formatDate(createdAt)}
                      </p>
                      <p className="flex items-center gap-2">
                        <HiOutlineGlobeAlt className="w-5 h-5 text-green-400" />
                        English
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Thumbnail */}
                <div className="relative group overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-richblack-900 via-transparent to-transparent z-10"></div>
                  <img
                    src={thumbnail}
                    alt="course thumbnail"
                    className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Right Column - Course Card (Desktop) */}
              <div className="lg:col-span-1 hidden lg:block">
                <div className="sticky top-24">
                  <CourseDetailsCard
                    course={response?.course}
                    setConfirmationModal={setConfirmationModal}
                    handleBuyCourse={handleBuyCourse}
                  />
                </div>
              </div>
            </div>

            {/* Mobile CTA */}
            <div className="lg:hidden mt-8">
              <div className="bg-gradient-to-r from-richblack-700 to-richblack-800 p-6 rounded-2xl border border-richblack-600 shadow-2xl">
                <p className="text-4xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent">
                  ₹{price}
                </p>
                <button 
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-richblack-900 font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl mb-3"
                  onClick={handleBuyCourse}
                >
                  Enroll Now
                </button>
                <button className="w-full bg-richblack-700 hover:bg-richblack-600 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 border border-richblack-600 hover:border-richblack-500">
                  Add to Cart
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="bg-richblack-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            
            {/* Left Column - Course Details */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* What You'll Learn */}
              <div>
                <div className="bg-gradient-to-br from-richblack-800 to-richblack-700 p-8 rounded-3xl border border-richblack-600 shadow-xl">
                  <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      What you'll learn
                    </span>
                  </h2>
                  <div className="text-richblack-100 prose prose-invert max-w-none">
                    <ReactMarkdown>{whatYouWillLearn}</ReactMarkdown>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <div>
                <div className="flex flex-col gap-6">
                  <h2 className="text-3xl font-bold text-white">Course Content</h2>
                  
                  <div className="bg-richblack-800 p-6 rounded-2xl border border-richblack-700">
                    <div className="flex flex-wrap justify-between gap-4 items-center">
                      <div className="flex flex-wrap gap-4 text-richblack-200">
                        <span className="flex items-center gap-2 bg-richblack-700 px-4 py-2 rounded-lg">
                          📚 {courseContent.length} sections
                        </span>
                        <span className="flex items-center gap-2 bg-richblack-700 px-4 py-2 rounded-lg">
                          🎥 {totalNoOfLectures} lectures
                        </span>
                        <span className="flex items-center gap-2 bg-richblack-700 px-4 py-2 rounded-lg">
                          ⏱️ {response.data?.totalDuration}
                        </span>
                      </div>
                      <button
                        className="text-yellow-50 hover:text-yellow-25 font-semibold transition-colors duration-200 underline decoration-2 underline-offset-4"
                        onClick={() => setIsActive([])}
                      >
                        Collapse all
                      </button>
                    </div>
                  </div>
                </div>

                {/* Course Accordion */}
                <div className="py-6 space-y-3">
                  {courseContent?.map((course, index) => (
                    <CourseAccordionBar
                      course={course}
                      key={index}
                      isActive={isActive}
                      handleActive={handleActive}
                    />
                  ))}
                </div>
              </div>

              {/* Instructor */}
              <div>
                <h2 className="text-3xl font-bold mb-6 text-black">Meet Your Instructor</h2>
                <div className="bg-gradient-to-br from-richblack-800 to-richblack-700 p-8 rounded-3xl border border-richblack-600 shadow-xl">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="relative">
                      <img
                        src={
                          instructor.image
                            ? instructor.image
                            : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                        }
                        alt="Instructor"
                        className="h-20 w-20 rounded-full object-cover border-4 border-blue-500 shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-richblack-800"></div>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-black">{`${instructor.firstName} ${instructor.lastName}`}</p>
                      <p className="text-richblack-300">Course Instructor</p>
                    </div>
                  </div>
                  <p className="text-richblack-100 leading-relaxed text-lg">
                    {instructor?.additionalDetails?.about}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Empty space for desktop card alignment */}
            <div className="lg:col-span-1 hidden lg:block">
              {/* Intentionally empty - card is positioned in hero */}
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  )
}

export default CourseDetails