import React, { useState } from "react";
import { Eye, EyeOff, Mail, ArrowLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

import { sendOtp } from "../services/operations/Authapi";
import { setSignupData } from "../slices/authslice";

const ACCOUNT_TYPE = {
  STUDENT: "Student",
  INSTRUCTOR: "Instructor",
};

const Signup = () => {
 const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  // data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Back Button */}
      <div className="absolute top-4 left-4 flex items-center gap-2 cursor-pointer mt-14">
        <ArrowLeft size={18} />
        <Link to="/" className="text-sm">
          Back
        </Link>
      </div>

      {/* Login Button */}
      <div className="absolute top-4 right-6">
        <Link
          to="/login"
          className="px-4 py-1 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700"
        >
          Login
        </Link>
      </div>

      {/* Branding */}
      <h1 className="text-center font-bold text-lg">STUDYMATE</h1>
      <p className="text-center text-sm mb-8">Sign up</p>

      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Signup Form */}
        <form
          className="w-full md:w-1/2 flex flex-col gap-4"
          onSubmit={handleOnSubmit}
        >
          {/* Account Type Tabs */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              type="button"
              onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}
              className={`px-4 py-2 rounded-md text-sm font-medium border ${
                accountType === ACCOUNT_TYPE.STUDENT
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}
              className={`px-4 py-2 rounded-md text-sm font-medium border ${
                accountType === ACCOUNT_TYPE.INSTRUCTOR
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-600 border-gray-300"
              }`}
            >
              Instructor
            </button>
          </div>

          {/* First + Last Name */}
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="First Name"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Last Name"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email */}
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm"
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="hidden md:flex flex-col items-center justify-center px-6">
          <div className="h-52 w-px bg-gray-300"></div>
          <span className="mt-2 text-xs font-semibold">OR</span>
        </div>

        {/* Google / Mail Signup */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <button className="flex items-center justify-center gap-2 w-full border rounded-full py-2 text-sm hover:bg-gray-50">
            <FcGoogle size={20} /> Continue with Google
          </button>
          <button className="flex items-center justify-center gap-2 w-full border rounded-full py-2 text-sm hover:bg-gray-50">
            <Mail size={18} /> Continue with Mail
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
