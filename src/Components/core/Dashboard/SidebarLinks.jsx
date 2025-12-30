import * as Icons from "react-icons/vsc"
import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/coursesSlice"

export default function SidebarLink({ link, iconName, onClick }) {
  const Icon = Icons[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const isActive = matchRoute(link.path)

  return (
    <NavLink
      to={link.path}
      onClick={() => {
        dispatch(resetCourseState())
        onClick?.()
      }}
      className={`group relative flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-gradient-to-r from-blue-500/20 to-blue-600/20 text-blue-400 shadow-lg shadow-blue-500/10"
          : "text-richblack-300 hover:bg-richblack-800/50 hover:text-richblack-5"
      }`}
    >
      {/* Active indicator bar */}
      <span
        className={`absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-gradient-to-b from-blue-400 to-blue-600 transition-all duration-200 ${
          isActive ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      ></span>

      {/* Icon with background */}
      <div className={`relative flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200 ${
        isActive 
          ? "bg-blue-500/20" 
          : "bg-richblack-800/30 group-hover:bg-richblack-700/50"
      }`}>
        <Icon className={`text-lg transition-all duration-200 ${
          isActive ? "scale-110" : "group-hover:scale-110"
        }`} />
        
        {/* Glow effect on active */}
        {isActive && (
          <div className="absolute inset-0 rounded-lg bg-blue-500/20 blur-md -z-10"></div>
        )}
      </div>

      {/* Link text */}
      <span className={`text-sm font-medium transition-all duration-200 ${
        isActive ? "translate-x-0.5" : ""
      }`}>
        {link.name}
      </span>

      {/* Hover indicator */}
      <div className={`absolute right-2 w-1.5 h-1.5 rounded-full bg-blue-400 transition-all duration-200 ${
        isActive ? "opacity-0" : "opacity-0 group-hover:opacity-100"
      }`}></div>
    </NavLink>
  )
}