import { useState } from "react"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FiLock, FiShield, FiX, FiCheck } from "react-icons/fi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "../../../../services/operations/SettingsAPI"

export default function UpdatePassword() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const newPassword = watch("newPassword")

  // Password strength checker
  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" }
    
    let strength = 0
    if (password.length >= 8) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[^a-zA-Z0-9]/.test(password)) strength++

    const strengthMap = {
      0: { label: "Very Weak", color: "bg-red-500" },
      1: { label: "Weak", color: "bg-orange-500" },
      2: { label: "Fair", color: "bg-yellow-500" },
      3: { label: "Good", color: "bg-blue-500" },
      4: { label: "Strong", color: "bg-green-500" },
    }

    return { strength, ...strengthMap[strength] }
  }

  const passwordStrength = getPasswordStrength(newPassword)

  const submitPasswordForm = async (data) => {
    setIsSubmitting(true)
    try {
      await changePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="my-10 rounded-xl border border-richblack-700 bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 shadow-lg">
        <div className="mb-6 pb-4 border-b border-richblack-700">
          <h2 className="text-xl font-bold text-richblack-5 flex items-center gap-2">
            <FiShield className="text-blue-400" />
            Password & Security
          </h2>
          <p className="text-sm text-richblack-300 mt-1">
            Keep your account secure by updating your password regularly
          </p>
        </div>

        <div className="space-y-6">
          {/* Password Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Current Password */}
            <div className="space-y-2">
              <label htmlFor="oldPassword" className="text-sm font-medium text-richblack-5 flex items-center gap-2">
                <FiLock className="text-richblack-300" />
                Current Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  name="oldPassword"
                  id="oldPassword"
                  placeholder="Enter current password"
                  className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 pr-12 text-richblack-5 placeholder-richblack-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  {...register("oldPassword", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-400 hover:text-richblack-5 transition-colors p-1"
                  aria-label={showOldPassword ? "Hide password" : "Show password"}
                >
                  {showOldPassword ? (
                    <AiOutlineEyeInvisible fontSize={20} />
                  ) : (
                    <AiOutlineEye fontSize={20} />
                  )}
                </button>
              </div>
              {errors.oldPassword && (
                <span className="text-xs text-red-400 flex items-center gap-1">
                  Please enter your current password.
                </span>
              )}
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <label htmlFor="newPassword" className="text-sm font-medium text-richblack-5 flex items-center gap-2">
                <FiLock className="text-richblack-300" />
                New Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  id="newPassword"
                  placeholder="Enter new password"
                  className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 pr-12 text-richblack-5 placeholder-richblack-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  {...register("newPassword", { 
                    required: true,
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters"
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-richblack-400 hover:text-richblack-5 transition-colors p-1"
                  aria-label={showNewPassword ? "Hide password" : "Show password"}
                >
                  {showNewPassword ? (
                    <AiOutlineEyeInvisible fontSize={20} />
                  ) : (
                    <AiOutlineEye fontSize={20} />
                  )}
                </button>
              </div>
              {errors.newPassword && (
                <span className="text-xs text-red-400 flex items-center gap-1">
                  {errors.newPassword.message || "Please enter your new password."}
                </span>
              )}
            </div>
          </div>

          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="space-y-2 animate-slideIn">
              <div className="flex items-center justify-between">
                <span className="text-sm text-richblack-300">Password Strength:</span>
                <span className={`text-sm font-medium ${
                  passwordStrength.strength >= 3 ? "text-green-400" : 
                  passwordStrength.strength >= 2 ? "text-yellow-400" : "text-red-400"
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="h-2 bg-richblack-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${passwordStrength.color} transition-all duration-300`}
                  style={{ width: `${(passwordStrength.strength / 4) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Password Requirements */}
          <div className="rounded-lg bg-richblack-800 border border-richblack-700 p-4">
            <h3 className="text-sm font-medium text-richblack-5 mb-3">
              Password Requirements:
            </h3>
            <div className="space-y-2 text-xs text-richblack-300">
              <div className="flex items-center gap-2">
                <FiCheck className={newPassword?.length >= 8 ? "text-green-400" : "text-richblack-500"} />
                <span>At least 8 characters</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className={/[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword) ? "text-green-400" : "text-richblack-500"} />
                <span>Contains uppercase and lowercase letters</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className={/\d/.test(newPassword) ? "text-green-400" : "text-richblack-500"} />
                <span>Contains at least one number</span>
              </div>
              <div className="flex items-center gap-2">
                <FiCheck className={/[^a-zA-Z0-9]/.test(newPassword) ? "text-green-400" : "text-richblack-500"} />
                <span>Contains at least one special character</span>
              </div>
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
              Updating...
            </>
          ) : (
            <>
              <FiShield className="text-lg" />
              Update Password
            </>
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </form>
  )
}