import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { useLocation } from "react-router-dom"

import "video-react/dist/video-react.css"
import { Player, BigPlayButton } from "video-react"

import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState(null)
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      if (!courseSectionData.length) return
      if (!courseId || !sectionId || !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        const filteredSection = courseSectionData.find(
          (section) => section._id === sectionId
        )
        const filteredVideo = filteredSection?.subSection.find(
          (sub) => sub._id === subSectionId
        )
        setVideoData(filteredVideo)
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      }
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (s) => s._id === sectionId
    )
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex(
      (v) => v._id === subSectionId
    )
    return sectionIndex === 0 && subIndex === 0
  }

  const isLastVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (s) => s._id === sectionId
    )
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex(
      (v) => v._id === subSectionId
    )
    const lastSectionIndex = courseSectionData.length - 1
    const lastSubIndex =
      courseSectionData[lastSectionIndex]?.subSection.length - 1
    return sectionIndex === lastSectionIndex && subIndex === lastSubIndex
  }

  const goToNextVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (s) => s._id === sectionId
    )
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex(
      (v) => v._id === subSectionId
    )

    if (subIndex < courseSectionData[sectionIndex].subSection.length - 1) {
      const nextSubId = courseSectionData[sectionIndex].subSection[subIndex + 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubId}`)
    } else if (sectionIndex < courseSectionData.length - 1) {
      const nextSectionId = courseSectionData[sectionIndex + 1]._id
      const nextSubId = courseSectionData[sectionIndex + 1].subSection[0]._id
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubId}`)
    }
  }

  const goToPrevVideo = () => {
    const sectionIndex = courseSectionData.findIndex(
      (s) => s._id === sectionId
    )
    const subIndex = courseSectionData[sectionIndex]?.subSection.findIndex(
      (v) => v._id === subSectionId
    )

    if (subIndex > 0) {
      const prevSubId = courseSectionData[sectionIndex].subSection[subIndex - 1]._id
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubId}`)
    } else if (sectionIndex > 0) {
      const prevSectionId = courseSectionData[sectionIndex - 1]._id
      const prevSubId =
        courseSectionData[sectionIndex - 1].subSection.slice(-1)[0]._id
      navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubId}`)
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId, subsectionId: subSectionId },
      token
    )
    if (res) dispatch(updateCompletedLectures(subSectionId))
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8 mt-16">
      <div className="mx-auto max-w-6xl">

        {/* Video Player */}
        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-2xl">
          {videoData ? (
            <Player
              ref={playerRef}
              playsInline
              src={videoData.videoUrl}
              poster={previewSource}
              className="absolute top-0 left-0 w-full h-full rounded-2xl"
              fluid={false}
              width="100%"
              height="100%"
              onEnded={() => setVideoEnded(true)}
            >
              <BigPlayButton position="center" />
            </Player>
          ) : (
            <img
              src={previewSource}
              alt="Preview"
              className="w-full h-full object-cover rounded-2xl"
            />
          )}
        </div>

        {/* Video Completion Overlay */}
        {videoEnded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center p-8 rounded-2xl bg-black/70">
            <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/50">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Video Completed!</h3>
            {!completedLectures.includes(subSectionId) && (
              <button
                onClick={handleLectureCompletion}
                disabled={loading}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                {loading ? "Loading..." : "Mark As Completed"}
              </button>
            )}
          </div>
        )}

        {/* Video Info */}
        <div className="mt-6 p-6 rounded-2xl bg-slate-900/50 shadow-xl backdrop-blur-xl">
          {completedLectures.includes(subSectionId) && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-medium text-emerald-400 ring-1 ring-emerald-500/30 mb-2">
              Completed
            </span>
          )}
          <h1 className="text-4xl font-bold text-white mb-2">{videoData?.title}</h1>
          <p className="text-slate-300 leading-relaxed">{videoData?.description}</p>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex gap-4">
          {!isFirstVideo() && (
            <button
              onClick={goToPrevVideo}
              className="px-4 py-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition"
            >
              Previous
            </button>
          )}
          {!isLastVideo() && (
            <button
              onClick={goToNextVideo}
              className="px-4 py-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition"
            >
              Next
            </button>
          )}
        </div>

      </div>
    </div>
  )
}

export default VideoDetails
