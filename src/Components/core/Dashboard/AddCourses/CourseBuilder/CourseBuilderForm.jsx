import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { IoAddCircleOutline } from "react-icons/io5"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/coursesSlice"

import NestedView from "./NestedView"

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { course } = useSelector((state) => state.course)
  const { token } = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false)
  const [editSectionName, setEditSectionName] = useState(null)
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    setLoading(true)

    let result

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      )
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseID: course._id,
        },
        token
      )
    }
    if (result) {
      dispatch(setCourse(result))
      setEditSectionName(null)
      setValue("sectionName", "")
    }
    setLoading(false)
  }

  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit()
      return
    }
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  const goToNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section")
      return
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in each section")
      return
    }
    dispatch(setStep(3))
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  return (
    <div className="relative space-y-8 rounded-2xl border border-richblack-700/50 bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-richblack-700/20">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      
      <div className="relative">
        <h2 className="text-3xl font-bold text-richblack-5 tracking-tight">
          Course Builder
        </h2>
        <p className="mt-2 text-sm text-richblack-300">
          Create and organize your course sections
        </p>
      </div>

      <div onSubmit={handleSubmit(onSubmit)} className="relative space-y-6">
        <div className="flex flex-col space-y-3">
          <label className="text-sm font-medium text-richblack-5" htmlFor="sectionName">
            Section Name <sup className="text-pink-400">*</sup>
          </label>
          <div className="relative group">
            <input
              id="sectionName"
              disabled={loading}
              placeholder="Add a section to build your course"
              {...register("sectionName", { required: true })}
              className="form-style w-full rounded-xl border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-10" />
          </div>
          {errors.sectionName && (
            <span className="ml-1 text-xs tracking-wide text-pink-400 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Section name is required
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit(onSubmit)}
            className="group relative inline-flex items-center gap-2 rounded-xl border-2 border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 px-6 py-3 font-semibold text-yellow-50 transition-all duration-300 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          >
            <IoAddCircleOutline size={20} className="text-yellow-50 transition-transform group-hover:rotate-90 duration-300" />
            <span>{editSectionName ? "Edit Section Name" : "Create Section"}</span>
            {loading && (
              <div className="w-4 h-4 border-2 border-yellow-50/30 border-t-yellow-50 rounded-full animate-spin" />
            )}
          </button>
          
          {editSectionName && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm font-medium text-richblack-300 hover:text-richblack-5 underline underline-offset-4 transition-colors duration-200"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </div>

      {course.courseContent.length > 0 && (
        <div className="relative">
          <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
        </div>
      )}

      <div className="relative flex justify-end gap-3 pt-4 border-t border-richblack-700/50">
        <button
          onClick={goBack}
          className="group flex items-center gap-2 rounded-xl bg-richblack-300 px-6 py-3 font-semibold text-richblack-900 transition-all duration-300 hover:bg-richblack-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        
        <button
          onClick={goToNext}
          disabled={loading}
          className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-500 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Next</span>
          <MdNavigateNext className="text-xl transition-transform group-hover:translate-x-1 duration-300" />
        </button>
      </div>
    </div>
  )
}