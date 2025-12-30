import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import useOnClickOutside from "../hooks/useOnClickOutside"
import { logout } from "../services/operations/Authapi"

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile)
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  if (!user) return null

  return (
    <button 
      className="relative" 
      onClick={() => setOpen(true)}
      aria-label="User menu"
    >
      <div className="flex items-center gap-x-2 rounded-full bg-richblack-700/50 py-1.5 px-2 pr-3 transition-all duration-200 hover:bg-richblack-700 hover:shadow-lg">
        <div className="relative">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[32px] h-[32px] rounded-full object-cover ring-2 ring-richblack-600 transition-all duration-200 hover:ring-blue-500"
          />
          <div className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-richblack-800"></div>
        </div>
        <AiOutlineCaretDown 
          className={`text-sm text-richblack-100 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`} 
        />
      </div>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[120%] right-0 z-[1000] w-56 overflow-hidden rounded-xl border border-richblack-700 bg-richblack-800 shadow-2xl  animate-slideDown"
          ref={ref}
        >
          {/* User Info Header */}
          <div className="border-b border-richblack-700 bg-gradient-to-br from-richblack-700 to-richblack-800 px-4 py-3">
            <p className="text-sm font-semibold text-richblack-5 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-richblack-300 truncate mt-0.5">
              {user?.email}
            </p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link 
              to="/dashboard/my-profile" 
              onClick={() => setOpen(false)}
              className="block"
            >
              <div className="flex items-center gap-x-3 px-4 py-2.5 text-sm text-richblack-100 transition-all duration-200 hover:bg-richblack-700 hover:text-richblack-25 hover:pl-5 group bg-white">
                <VscDashboard className="text-lg text-richblack-300 group-hover:text-blue-400 transition-colors" />
                <span className="font-medium">Dashboard</span>
              </div>
            </Link>

            <button
              onClick={() => {
                dispatch(logout(navigate))
                setOpen(false)
              }}
              className="flex w-full items-center gap-x-3 px-4 py-2.5 text-sm text-richblack-100 transition-all duration-200 hover:bg-richblack-700 hover:text-richblack-25 hover:pl-5 group bg-white"
            >
              <VscSignOut className="text-lg text-richblack-300 group-hover:text-red-400 transition-colors" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </button>
  )
}