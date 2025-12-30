import { RiEditBoxLine } from "react-icons/ri"
import { FiMail, FiPhone, FiCalendar, FiUser } from "react-icons/fi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { formattedDate } from "../../../utils/dateFormatter"


export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-richblack-5 mb-2 m-20">
          My Profile
        </h1>
        <p className="text-richblack-300">
          View and manage your personal information
        </p>
      </div>

      {/* Profile Header Card */}
      <div className="rounded-xl border border-richblack-700 bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative group">
              <img
                src={user?.image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-20 h-20 rounded-full object-cover ring-4 ring-richblack-700 group-hover:ring-blue-500 transition-all duration-300 shadow-xl"
              />
              <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-green-500 ring-4 ring-richblack-900"></div>
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-xl font-bold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-sm text-richblack-300 flex items-center gap-2 justify-center sm:justify-start">
                <FiMail className="text-blue-400" />
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="px-5 py-2.5 rounded-lg bg-richblack-700 hover:bg-richblack-600 text-richblack-50 font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 flex items-center gap-2 whitespace-nowrap"
          >
            <RiEditBoxLine className="text-lg" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="rounded-xl border border-richblack-700 bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-richblack-5 flex items-center gap-2">
            <FiUser className="text-blue-400" />
            About
          </h3>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <RiEditBoxLine />
            Edit
          </button>
        </div>
        <div className="rounded-lg bg-richblack-800 border border-richblack-700 p-4">
          <p className={`text-sm ${
            user?.additionalDetails?.about
              ? "text-richblack-100"
              : "text-richblack-400 italic"
          }`}>
            {user?.additionalDetails?.about ?? "Write something about yourself to let others know who you are"}
          </p>
        </div>
      </div>

      {/* Personal Details Section */}
      <div className="rounded-xl border border-richblack-700 bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-richblack-5 flex items-center gap-2">
            <FiUser className="text-blue-400" />
            Personal Details
          </h3>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1.5"
          >
            <RiEditBoxLine />
            Edit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-richblack-400 uppercase tracking-wider">
              First Name
            </label>
            <div className="rounded-lg bg-richblack-800 border border-richblack-700 px-4 py-3">
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
          </div>

          {/* Last Name */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-richblack-400 uppercase tracking-wider">
              Last Name
            </label>
            <div className="rounded-lg bg-richblack-800 border border-richblack-700 px-4 py-3">
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-richblack-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiMail className="text-xs" />
              Email Address
            </label>
            <div className="rounded-lg bg-richblack-800 border border-richblack-700 px-4 py-3">
              <p className="text-sm font-medium text-richblack-5 break-all">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-richblack-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiPhone className="text-xs" />
              Phone Number
            </label>
            <div className="rounded-lg bg-richblack-800 border border-richblack-700 px-4 py-3">
              <p className={`text-sm font-medium ${
                user?.additionalDetails?.contactNumber
                  ? "text-richblack-5"
                  : "text-richblack-400 italic"
              }`}>
                {user?.additionalDetails?.contactNumber ?? "Add contact number"}
              </p>
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-richblack-400 uppercase tracking-wider">
              Gender
            </label>
            <div className="rounded-lg bg-richblack-800 border border-richblack-700 px-4 py-3">
              <p className={`text-sm font-medium ${
                user?.additionalDetails?.gender
                  ? "text-richblack-5"
                  : "text-richblack-400 italic"
              }`}>
                {user?.additionalDetails?.gender ?? "Add gender"}
              </p>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-richblack-400 uppercase tracking-wider flex items-center gap-1.5">
              <FiCalendar className="text-xs" />
              Date of Birth
            </label>
            <div className="rounded-lg bg-richblack-800 border border-richblack-700 px-4 py-3">
              <p className={`text-sm font-medium ${
                user?.additionalDetails?.dateOfBirth
                  ? "text-richblack-5"
                  : "text-richblack-400 italic"
              }`}>
                {formattedDate(user?.additionalDetails?.dateOfBirth) ?? "Add date of birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}