import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../services/operations/courseDetailsAPI"
import { setCourse, setStep } from "../../../../../slices/coursesSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"

import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function CourseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { course, editCourse } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchCourseCategories()
      if (categories.length > 0) {
        setCourseCategories(categories)
      }
      setLoading(false)
    }
    
    if (editCourse) {
      setValue("courseTitle", course.courseName)
      setValue("courseShortDesc", course.courseDescription)
      setValue("coursePrice", course.price)
      setValue("courseTags", course.tag)
      setValue("courseBenefits", course.whatYouWillLearn)
      setValue("courseCategory", course.category)
      setValue("courseRequirements", course.instructions)
      setValue("courseImage", course.thumbnailImage)
    }
    getCategories()
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    if (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString() ||
      currentValues.courseImage !== course.thumbnailImage
    ) {
      return true
    }
    return false
  }

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        formData.append("courseId", course._id)
        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle)
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc)
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice)
        }
        if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits)
        }
        if (currentValues.courseCategory._id !== course.category._id) {
          formData.append("category", data.courseCategory)
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          )
        }
        if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
        setLoading(true)
        const result = await editCourseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("courseName", data.courseTitle)
    formData.append("courseDescription", data.courseShortDesc)
    formData.append("price", data.coursePrice)
    formData.append("tag", JSON.stringify(data.courseTags))
    formData.append("whatYouWillLearn", data.courseBenefits)
    formData.append("category", data.courseCategory)
    formData.append("status", COURSE_STATUS.DRAFT)
    formData.append("instructions", JSON.stringify(data.courseRequirements))
    formData.append("thumbnailImage", data.courseImage)
    setLoading(true)
    const result = await addCourseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
  }

  return (
    <div className="relative space-y-8 rounded-2xl border border-richblack-700/50 bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-richblack-700/20">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      
      <div className="relative">
        <h2 className="text-3xl font-bold text-richblack-5 tracking-tight">
          Course Information
        </h2>
        <p className="mt-2 text-sm text-richblack-300">
          {editCourse ? "Update your course details" : "Fill in the basic details about your course"}
        </p>
      </div>

      <div className="relative space-y-6">
        {/* Course Title */}
        <div className="flex flex-col space-y-3">
          <label className="text-sm font-medium text-richblack-5" htmlFor="courseTitle">
            Course Title <sup className="text-pink-400">*</sup>
          </label>
          <div className="relative group">
            <input
              id="courseTitle"
              placeholder="Enter Course Title"
              {...register("courseTitle", { required: true })}
              className="form-style w-full rounded-xl border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-10" />
          </div>
          {errors.courseTitle && (
            <span className="ml-1 text-xs tracking-wide text-pink-400 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Course title is required
            </span>
          )}
        </div>

        {/* Course Short Description */}
        <div className="flex flex-col space-y-3">
          <label className="text-sm font-medium text-richblack-5" htmlFor="courseShortDesc">
            Course Short Description <sup className="text-pink-400">*</sup>
          </label>
          <div className="relative group">
            <textarea
              id="courseShortDesc"
              placeholder="Enter Description"
              {...register("courseShortDesc", { required: true })}
              className="form-style resize-none min-h-[130px] w-full rounded-xl border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-10" />
          </div>
          {errors.courseShortDesc && (
            <span className="ml-1 text-xs tracking-wide text-pink-400 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Course Description is required
            </span>
          )}
        </div>

        {/* Course Price */}
        <div className="flex flex-col space-y-3">
          <label className="text-sm font-medium text-richblack-5" htmlFor="coursePrice">
            Course Price <sup className="text-pink-400">*</sup>
          </label>
          <div className="relative group">
            <input
              id="coursePrice"
              placeholder="Enter Course Price"
              {...register("coursePrice", {
                required: true,
                valueAsNumber: true,
                pattern: {
                  value: /^(0|[1-9]\d*)(\.\d+)?$/,
                },
              })}
              className="form-style w-full !pl-12 rounded-xl border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-8 rounded-lg bg-richblack-600">
              <HiOutlineCurrencyRupee className="text-xl text-richblack-300" />
            </div>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-10" />
          </div>
          {errors.coursePrice && (
            <span className="ml-1 text-xs tracking-wide text-pink-400 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Course Price is required
            </span>
          )}
        </div>

        {/* Course Category */}
        <div className="flex flex-col space-y-3">
          <label className="text-sm font-medium text-richblack-5" htmlFor="courseCategory">
            Course Category <sup className="text-pink-400">*</sup>
          </label>
          <div className="relative group">
            <select
              {...register("courseCategory", { required: true })}
              defaultValue=""
              id="courseCategory"
              className="form-style w-full rounded-xl border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"
            >
              <option value="" disabled>
                Choose a Category
              </option>
              {!loading &&
                courseCategories?.map((category, indx) => (
                  <option key={indx} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-richblack-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-10" />
          </div>
          {errors.courseCategory && (
            <span className="ml-1 text-xs tracking-wide text-pink-400 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Course Category is required
            </span>
          )}
        </div>

        {/* Course Tags */}
        <ChipInput
          label="Tags"
          name="courseTags"
          placeholder="Enter Tags and press Enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Course Thumbnail Image */}
        <div className="rounded-xl bg-richblack-700/30 border border-richblack-600/30 p-4">
          <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors={errors}
            editData={editCourse ? course?.thumbnail : null}
          />
        </div>

        {/* Benefits of the course */}
        <div className="flex flex-col space-y-3">
          <label className="text-sm font-medium text-richblack-5" htmlFor="courseBenefits">
            Benefits of the course <sup className="text-pink-400">*</sup>
          </label>
          <div className="relative group">
            <textarea
              id="courseBenefits"
              placeholder="Enter benefits of the course"
              {...register("courseBenefits", { required: true })}
              className="form-style resize-none min-h-[130px] w-full rounded-xl border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-10" />
          </div>
          {errors.courseBenefits && (
            <span className="ml-1 text-xs tracking-wide text-pink-400 flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Benefits of the course is required
            </span>
          )}
        </div>

        {/* Requirements/Instructions */}
        <RequirementsField
          name="courseRequirements"
          label="Requirements/Instructions"
          register={register}
          setValue={setValue}
          errors={errors}
          getValues={getValues}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-richblack-700/50">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className="group flex items-center gap-2 rounded-xl bg-richblack-300 px-6 py-3 font-semibold text-richblack-900 transition-all duration-300 hover:bg-richblack-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue Without Saving
            </button>
          )}
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={loading}
            className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-blue-500 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-500/30 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <span>{!editCourse ? "Next" : "Save Changes"}</span>
                <MdNavigateNext className="text-xl transition-transform group-hover:translate-x-1 duration-300" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}