import { useState } from "react"
import { VscSignOut } from "react-icons/vsc"
import { FiMenu, FiX } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { sidebarLinks } from "../../../data/dashboard-links"
import { logout } from "../../../services/operations/Authapi"
import ConfirmationModal from "../../common/ConfirmationModal"
import SidebarLink from "./SidebarLinks"

export default function Sidebar() {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  )
  const { loading: authLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [confirmationModal, setConfirmationModal] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  if (profileLoading || authLoading) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] min-w-[280px] items-center justify-center bg-richblack-900 border-r border-richblack-800/50 m-20">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-blue-500/20 rounded-full"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 rounded-lg bg-richblack-800 border border-richblack-700 text-richblack-5 hover:bg-richblack-700 transition-colors "
      >
        {isMobileMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        flex h-[calc(100vh-3.5rem)] w-[280px] flex-col
        bg-richblack-900 border-r border-richblack-800/50
        transition-transform duration-300 lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full m-20'}
      `}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(139,92,246,0.3),transparent_50%)]"></div>
        </div>

        <div className="relative flex-1 flex flex-col py-6">
          {/* Brand/Logo Area */}
          <div className="px-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">ED</span>
              </div>
              <div>
                <h2 className="text-richblack-5 font-bold text-lg">Dashboard</h2>
                <p className="text-richblack-400 text-xs">Education Platform</p>
              </div>
            </div>

            {/* User Profile Compact */}
            <button
              onClick={() => navigate("/dashboard/my-profile")}
              className="w-full group"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-richblack-800/80 to-richblack-800/40 border border-richblack-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <div className="relative flex-shrink-0">
                  <img
                    src={user?.image}
                    alt="profile"
                    className="w-11 h-11 rounded-full object-cover ring-2 ring-richblack-700 group-hover:ring-blue-500 transition-all"
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full ring-2 ring-richblack-900 shadow-lg"></div>
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-semibold text-richblack-5 truncate group-hover:text-blue-400 transition-colors">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-richblack-400 truncate capitalize">
                    {user?.accountType}
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Navigation Section */}
          <nav className="flex-1 px-4 space-y-0.5 overflow-y-auto custom-scrollbar">
            <div className="mb-2 px-3">
              <p className="text-xs font-semibold text-richblack-400 uppercase tracking-wider">
                Menu
              </p>
            </div>
            {sidebarLinks.map((link) => {
              if (link.type && user?.accountType !== link.type) return null
              return (
                <SidebarLink 
                  key={link.id} 
                  link={link} 
                  iconName={link.icon}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              )
            })}
          </nav>

          {/* Divider with dots */}
          <div className="px-6 py-4">
            <div className="flex items-center gap-1 justify-center">
              <div className="w-1 h-1 rounded-full bg-richblack-700"></div>
              <div className="w-1 h-1 rounded-full bg-richblack-700"></div>
              <div className="w-1 h-1 rounded-full bg-richblack-700"></div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="px-4 space-y-0.5 pb-4">
            <div className="mb-2 px-3">
              <p className="text-xs font-semibold text-richblack-400 uppercase tracking-wider">
                Account
              </p>
            </div>
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="VscSettingsGear"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            <button
              onClick={() => {
                setConfirmationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your account.",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setConfirmationModal(null),
                })
                setIsMobileMenuOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-richblack-300 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200 group"
            >
              <VscSignOut className="text-lg flex-shrink-0 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(44, 51, 63, 0.5);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(62, 76, 89, 0.7);
        }
      `}</style>
    </>
  )
}