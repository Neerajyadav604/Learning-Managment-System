import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.Subsection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.Subsection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  const progressPercentage = Math.round(
    (completedLectures?.length / totalNoOfLectures) * 100
  )

  return (
    <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r border-slate-800/50 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 backdrop-blur-xl mt-16">
      {/* Header Section */}
      <div className="border-b border-slate-800/50 bg-slate-900/50 p-5 backdrop-blur-sm">
        <div className="mb-4 flex w-full items-center justify-between">
          <button
            onClick={() => navigate(`/dashboard/enrolled-courses`)}
            className="group flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-slate-300 shadow-lg transition-all duration-300 hover:scale-95 hover:from-slate-700 hover:to-slate-800 hover:text-white hover:shadow-xl"
            title="Back to courses"
          >
            <IoIosArrowBack 
              size={20} 
              className="transition-transform duration-300 group-hover:-translate-x-0.5" 
            />
          </button>
          
          <button
            onClick={() => setReviewModal(true)}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/50"
          >
            <span className="relative z-10">Add Review</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
        </div>

        {/* Course Info */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold leading-tight text-white">
            {courseEntireData?.courseName}
          </h2>
          
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-400">Progress</span>
              <span className="font-semibold text-emerald-400">
                {completedLectures?.length} / {totalNoOfLectures}
              </span>
            </div>
            <div className="relative h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </div>
            </div>
            <p className="text-xs font-medium text-slate-500">
              {progressPercentage}% Complete
            </p>
          </div>
        </div>
      </div>

      {/* Sections List */}
      <div className="custom-scrollbar h-[calc(100vh-5rem)] overflow-y-auto">
        {courseSectionData.map((course, index) => (
          <div
            className="border-b border-slate-800/30"
            key={index}
          >
            {/* Section Header */}
            <button
              onClick={() => setActiveStatus(course?._id)}
              className="group flex w-full items-center justify-between bg-slate-800/30 px-5 py-4 transition-all duration-300 hover:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 text-xs font-bold text-slate-300 shadow-inner">
                  {index + 1}
                </div>
                <span className="text-left text-sm font-semibold text-slate-200 group-hover:text-white">
                  {course?.sectionName}
                </span>
              </div>
              
              <BsChevronDown
                className={`text-slate-400 transition-all duration-300 group-hover:text-slate-200 ${
                  activeStatus === course?._id ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            {/* Subsections */}
            {activeStatus === course?._id && (
              <div className="bg-slate-900/30">
                {course.Subsection.map((topic, i) => {
                  const isActive = videoBarActive === topic._id
                  const isCompleted = completedLectures.includes(topic?._id)
                  
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic._id)
                      }}
                      className={`group flex w-full items-center gap-3 border-l-4 px-5 py-3 text-left text-sm transition-all duration-300 ${
                        isActive
                          ? "border-emerald-500 bg-gradient-to-r from-emerald-500/20 to-transparent font-semibold text-white"
                          : "border-transparent text-slate-400 hover:border-slate-600 hover:bg-slate-800/40 hover:text-slate-200"
                      }`}
                    >
                      {/* Custom Checkbox */}
                      <div
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 transition-all duration-300 ${
                          isCompleted
                            ? "border-emerald-500 bg-emerald-500"
                            : isActive
                            ? "border-emerald-500"
                            : "border-slate-600 group-hover:border-slate-500"
                        }`}
                      >
                        {isCompleted && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>

                      {/* Lesson Title */}
                      <span className="flex-1 leading-snug">
                        {topic.title}
                      </span>

                      {/* Active Indicator */}
                      {isActive && (
                        <div className="flex h-2 w-2 flex-shrink-0 rounded-full bg-emerald-500">
                          <div className="h-full w-full animate-ping rounded-full bg-emerald-400" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(15, 23, 42, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 0.7);
        }
      `}</style>
    </div>
  )
}