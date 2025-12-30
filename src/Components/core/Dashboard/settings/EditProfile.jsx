import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FiUser, FiCalendar, FiPhone, FiFileText, FiSave, FiX } from "react-icons/fi"

import { updateProfile } from "../../../../services/operations/SettingsAPI"


const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]

export default function EditProfile() {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
console.log(user?.additionalDetails?.dateOfBirth)
  const submitProfileForm = async (data) => {
    setIsSubmitting(true)
    try {
      await dispatch(updateProfile(token, data))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitProfileForm)}>
      {/* Profile Information */}
      <div className="my-10 rounded-xl border border-richblack-700 bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 shadow-lg">
        <div className="mb-6 pb-4 border-b border-richblack-700">
          <h2 className="text-xl font-bold text-richblack-5 flex items-center gap-2">
            <FiUser className="text-blue-400" />
            Profile Information
          </h2>
          <p className="text-sm text-richblack-300 mt-1">
            Update your personal details and information
          </p>
        </div>

        <div className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="firstName" className="text-sm font-medium text-richblack-5 flex items-center gap-2">
                First Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter first name"
                className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 text-richblack-5 placeholder-richblack-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                {...register("firstName", { required: true })}
                defaultValue={user?.firstName}
              />
              {errors.firstName && (
                <span className="text-xs text-red-400 flex items-center gap-1">
                  Please enter your first name.
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="lastName" className="text-sm font-medium text-richblack-5 flex items-center gap-2">
                Last Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter last name"
                className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 text-richblack-5 placeholder-richblack-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                {...register("lastName", { required: true })}
                defaultValue={user?.lastName}
              />
              {errors.lastName && (
                <span className="text-xs text-red-400 flex items-center gap-1">
                  Please enter your last name.
                </span>
              )}
            </div>
          </div>

          {/* Date of Birth and Gender */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="dateOfBirth" className="text-sm font-medium text-richblack-5 flex items-center gap-2">
                <FiCalendar className="text-richblack-300" />
                Date of Birth <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 text-richblack-5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                {...register("dateOfBirth", {
                  required: {
                    value: true,
                    message: "Please enter your Date of Birth.",
                  },
                  max: {
                    value: new Date().toISOString().split("T")[0],
                    message: "Date of Birth cannot be in the future.",
                  },
                })}
                defaultValue={user?.additionalDetails?.dateOfBirth}
              />
              {errors.dateOfBirth && (
                <span className="text-xs text-red-400 flex items-center gap-1">
                  {errors.dateOfBirth.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="gender" className="text-sm font-medium text-richblack-5 flex items-center gap-2">
                Gender <span className="text-red-400">*</span>
              </label>
              <select
                name="gender"
                id="gender"
                className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 text-richblack-5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                {...register("gender", { required: true })}
                defaultValue={user?.additionalDetails?.gender}
              >
                <option value="" disabled className="bg-richblack-800">
                  Select Gender
                </option>
                {genders.map((ele, i) => (
                  <option key={i} value={ele} className="bg-richblack-800">
                    {ele}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <span className="text-xs text-red-400 flex items-center gap-1">
                  Please select your gender.
                </span>
              )}
            </div>
          </div>

          {/* Contact Number and About */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="contactNumber" className="text-sm font-medium text-richblack-5 flex items-center gap-2">
                <FiPhone className="text-richblack-300" />
                Contact Number <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="contactNumber"
                id="contactNumber"
                placeholder="Enter Contact Number"
                className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 text-richblack-5 placeholder-richblack-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter your Contact Number.",
                  },
                  maxLength: { value: 12, message: "Invalid Contact Number" },
                  minLength: { value: 10, message: "Invalid Contact Number" },
                })}
                defaultValue={user?.additionalDetails?.contactNumber}
              />
              {errors.contactNumber && (
                <span className="text-xs text-red-400 flex items-center gap-1">
                  {errors.contactNumber.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="about" className="text-sm font-medium text-richblack-5 flex items-center gap-2">
                <FiFileText className="text-richblack-300" />
                About <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="about"
                id="about"
                placeholder="Enter Bio Details"
                className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 text-richblack-5 placeholder-richblack-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                {...register("about", { required: true })}
                defaultValue={user?.additionalDetails?.about}
              />
              {errors.about && (
                <span className="text-xs text-red-400 flex items-center gap-1">
                  Please enter your bio.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate("/dashboard/my-profile")}
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-lg border border-richblack-700 bg-richblack-800 hover:bg-richblack-700 text-richblack-5 font-medium transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
        >
          <FiX className="text-lg" />
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : (
            <>
              <FiSave className="text-lg" />
              Save Changes
            </>
          )}
        </button>
      </div>
    </form>
  )
}