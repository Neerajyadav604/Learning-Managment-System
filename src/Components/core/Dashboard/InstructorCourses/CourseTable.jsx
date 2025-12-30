import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import { setCourse, setEditCourse } from "../../../../slices/coursesSlice"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import { formatDate } from "../../../../services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)
  const TRUNCATE_LENGTH = 30

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  console.log("All Course ", courses)

  return (
    <div className="mt-10">
      <Table className="overflow-hidden rounded-2xl border border-richblack-700 bg-richblack-800 shadow-xl">
        <Thead>
          <Tr className="flex gap-x-10 border-b border-richblack-700 bg-richblack-900 px-6 py-4">
            <Th className="flex-1 text-left text-xs font-semibold uppercase tracking-wider text-richblack-200">
              Courses
            </Th>
            <Th className="text-left text-xs font-semibold uppercase tracking-wider text-richblack-200">
              Duration
            </Th>
            <Th className="text-left text-xs font-semibold uppercase tracking-wider text-richblack-200">
              Price
            </Th>
            <Th className="text-left text-xs font-semibold uppercase tracking-wider text-richblack-200">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-16 text-center text-lg font-medium text-richblack-300">
                No courses found
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="group flex gap-x-10 border-b border-richblack-700 bg-richblack-800 px-6 py-6 transition-all duration-200 hover:bg-richblack-750"
              >
                <Td className="flex flex-1 gap-x-5">
                  <div className="relative overflow-hidden rounded-xl shadow-md">
                    <img
                      src={course?.thumbnail}
                      alt={course?.courseName}
                      className="h-[148px] w-[220px] rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-richblack-900/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                  <div className="flex flex-col justify-between py-1">
                    <div className="space-y-2">
                      <p className="text-lg font-bold text-richblack-5 transition-colors group-hover:text-caribbeangreen-200">
                        {course.courseName}
                      </p>
                      <p className="text-sm leading-relaxed text-richblack-300">
                        {course.courseDescription.split(" ").length >
                        TRUNCATE_LENGTH
                          ? course.courseDescription
                              .split(" ")
                              .slice(0, TRUNCATE_LENGTH)
                              .join(" ") + "..."
                          : course.courseDescription}
                      </p>
                    </div>
                    <div className="mt-3 space-y-2">
                      <p className="flex items-center gap-1.5 text-xs text-richblack-400">
                        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Created: {formatDate(course.createdAt)}
                      </p>
                      {course.status === COURSE_STATUS.DRAFT ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-500/10 px-3 py-1 text-xs font-medium text-pink-300 ring-1 ring-pink-500/20">
                          <HiClock size={12} />
                          Drafted
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-caribbeangreen-500/10 px-3 py-1 text-xs font-medium text-caribbeangreen-300 ring-1 ring-caribbeangreen-500/20">
                          <FaCheck size={10} />
                          Published
                        </span>
                      )}
                    </div>
                  </div>
                </Td>
                <Td className="flex items-center text-sm font-medium text-richblack-200">
                  <span className="flex items-center gap-1.5">
                    <svg className="h-4 w-4 text-richblack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    2hr 30min
                  </span>
                </Td>
                <Td className="flex items-center text-base font-semibold text-caribbeangreen-300">
                  ₹{course.price}
                </Td>
                <Td className="flex items-center gap-2">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    title="Edit"
                    className="rounded-lg bg-caribbeangreen-500/10 p-2.5 text-caribbeangreen-300 ring-1 ring-caribbeangreen-500/20 transition-all duration-200 hover:bg-caribbeangreen-500/20 hover:ring-caribbeangreen-500/40 disabled:opacity-50"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="rounded-lg bg-pink-500/10 p-2.5 text-pink-300 ring-1 ring-pink-500/20 transition-all duration-200 hover:bg-pink-500/20 hover:ring-pink-500/40 disabled:opacity-50"
                  >
                    <RiDeleteBin6Line size={18} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}