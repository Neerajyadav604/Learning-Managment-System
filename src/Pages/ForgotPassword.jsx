import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getPasswordResetToken } from "../services/operations/Authapi"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-[500px] rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl p-6 lg:p-10 border border-white/20">
          {/* Heading */}
          <h1 className="text-3xl font-bold text-center text-blue-100">
            {!emailSent ? "Reset your password" : "Check your email"}
          </h1>
          <p className="mt-3 text-center text-base text-richblack-200">
            {!emailSent
              ? "We’ll email you instructions to reset your password. If you don’t have access to your email, try account recovery."
              : `We have sent a reset link to `}
            {emailSent && (
              <span className="font-medium text-blue-200">{email}</span>
            )}
          </p>

          {/* Form */}
          <form onSubmit={handleOnSubmit} className="mt-8 space-y-6">
            {!emailSent && (
              <div>
                <label className="block text-sm font-medium text-richblack-5 mb-2">
                  Email Address <sup className="text-pink-200">*</sup>
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-richblack-600 bg-richblack-800 px-4 py-3 text-richblack-5 placeholder:text-richblack-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-400 to-blue-600 py-3 font-semibold text-white shadow-lg hover:from-blue-500 hover:to-blue-700 transition-all"
            >
              {!emailSent ? "Submit" : "Resend Email"}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 flex justify-center">
            <Link
              to="/login"
              className="flex items-center gap-x-2 text-sm font-medium text-richblack-200 hover:text-blue-300 transition"
            >
              <BiArrowBack /> Back To Login
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default ForgotPassword
