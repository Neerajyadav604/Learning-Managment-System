import { useState } from "react"
import { AiFillCaretDown } from "react-icons/ai"
import { FaPlus } from "react-icons/fa"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Line } from "react-icons/ri"
import { RxDropdownMenu } from "react-icons/rx"
import { useDispatch, useSelector } from "react-redux"

import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse } from "../../../../../slices/courseSlice"
import ConfirmationModal from "../../../../Common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"

export default function NestedView({ handleChangeEditSectionName }) {
  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  
  const [addSubsection, setAddSubsection] = useState(null)
  const [viewSubsection, setViewSubsection] = useState(null)
  const [editSubsection, setEditSubsection] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleDeleleSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    })
    if (result) {
      dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }

  const handledeleteSubSection = async (SubsectionId, sectionId) => {
    const result = await deleteSubSection({ SubsectionId, sectionId, token })
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setConfirmationModal(null)
  }

  return (
    <>
      <div
        className="rounded-xl bg-richblack-700/50 backdrop-blur-sm p-6 space-y-3 border border-richblack-600/30"
        id="nestedViewContainer"
      >
        {course?.courseContent?.map((section, index) => (
          <details 
            key={section._id} 
            open
            className="group rounded-lg bg-richblack-800/50 border border-richblack-600/50 overflow-hidden transition-all duration-300 hover:border-richblack-500/50 hover:shadow-lg hover:shadow-richblack-900/20"
          >
            <summary className="flex cursor-pointer items-center justify-between px-5 py-4 transition-all duration-200 hover:bg-richblack-700/30 list-none">
              <div className="flex items-center gap-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                  <RxDropdownMenu className="text-lg text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-richblack-5">
                    {section.sectionName}
                  </p>
                  <span className="text-xs text-richblack-400 mt-0.5">
                    {section.Subsection.length} {section.Subsection.length === 1 ? 'lecture' : 'lectures'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    handleChangeEditSectionName(section._id, section.sectionName)
                  }}
                  className="p-2 rounded-lg text-richblack-300 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200"
                  title="Edit section"
                >
                  <MdEdit className="text-lg" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    setConfirmationModal({
                      text1: "Delete this Section?",
                      text2: "All the lectures in this section will be deleted",
                      btn1Text: "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => handleDeleleSection(section._id),
                      btn2Handler: () => setConfirmationModal(null),
                    })
                  }}
                  className="p-2 rounded-lg text-richblack-300 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-200"
                  title="Delete section"
                >
                  <RiDeleteBin6Line className="text-lg" />
                </button>
                <div className="w-px h-5 bg-richblack-600 mx-1" />
                <AiFillCaretDown className="text-lg text-richblack-400 transition-transform duration-300 group-open:rotate-180" />
              </div>
            </summary>
            
            <div className="px-5 pb-4 pt-2 space-y-2">
              {section.Subsection.map((data, subIndex) => (
                <div
                  key={data?._id}
                  onClick={() => setViewSubsection(data)}
                  className="group/item flex cursor-pointer items-center justify-between gap-x-3 rounded-lg px-4 py-3 transition-all duration-200 hover:bg-richblack-700/50 border border-transparent hover:border-richblack-600/50"
                >
                  <div className="flex items-center gap-x-3">
                    <div className="flex items-center justify-center w-7 h-7 rounded-md bg-richblack-700 border border-richblack-600 group-hover/item:border-richblack-500 transition-colors">
                      <span className="text-xs font-medium text-richblack-300">
                        {subIndex + 1}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-richblack-5 group-hover/item:text-blue-400 transition-colors">
                        {data.title}
                      </p>
                      {data.timeDuration && (
                        <span className="text-xs text-richblack-400 mt-0.5">
                          {data.timeDuration}
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-x-1 opacity-0 group-hover/item:opacity-100 transition-opacity duration-200"
                  >
                    <button
                      onClick={() =>
                        setEditSubsection({ ...data, sectionId: section._id })
                      }
                      className="p-2 rounded-lg text-richblack-300 hover:text-blue-400 hover:bg-blue-500/10 transition-all duration-200"
                      title="Edit lecture"
                    >
                      <MdEdit className="text-base" />
                    </button>
                    <button
                      onClick={() =>
                        setConfirmationModal({
                          text1: "Delete this Sub-Section?",
                          text2: "This lecture will be deleted",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: () =>
                            handledeleteSubSection(data._id, section._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                      className="p-2 rounded-lg text-richblack-300 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-200"
                      title="Delete lecture"
                    >
                      <RiDeleteBin6Line className="text-base" />
                    </button>
                  </div>
                </div>
              ))}
              
              {section.Subsection.length === 0 && (
                <div className="flex items-center justify-center py-8 text-richblack-400">
                  <p className="text-sm">No lectures added yet</p>
                </div>
              )}
              
              <button
                onClick={() => setAddSubsection(section._id)}
                className="group/add mt-2 flex items-center gap-x-2 px-4 py-2.5 rounded-lg text-sm font-medium text-yellow-50 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300 w-full justify-center"
              >
                <FaPlus className="text-sm transition-transform group-hover/add:rotate-90 duration-300" />
                <span>Add Lecture</span>
              </button>
            </div>
          </details>
        ))}

        {course?.courseContent?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-richblack-700 border border-richblack-600 flex items-center justify-center mb-4">
              <RxDropdownMenu className="text-2xl text-richblack-400" />
            </div>
            <p className="text-richblack-300 font-medium">No sections created yet</p>
            <p className="text-sm text-richblack-400 mt-1">Add your first section to get started</p>
          </div>
        )}
      </div>

      {addSubsection ? (
        <SubSectionModal
          modalData={addSubsection}
          setModalData={setAddSubsection}
          add={true}
        />
      ) : viewSubsection ? (
        <SubSectionModal
          modalData={viewSubsection}
          setModalData={setViewSubsection}
          view={true}
        />
      ) : editSubsection ? (
        <SubSectionModal
          modalData={editSubsection}
          setModalData={setEditSubsection}
          edit={true}
        />
      ) : null}

      {confirmationModal && (
        <ConfirmationModal modalData={confirmationModal} />
      )}
    </>
  )
}