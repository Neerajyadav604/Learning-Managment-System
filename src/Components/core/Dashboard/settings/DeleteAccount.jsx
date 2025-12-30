import { useState } from "react"
import { FiTrash2, FiAlertTriangle, FiX } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { deleteProfile } from "../../../../services/operations/SettingsAPI"

export default function DeleteAccount() {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [confirmText, setConfirmText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDeleteAccount() {
    setIsDeleting(true)
    try {
      await dispatch(deleteProfile(token, navigate))
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setIsDeleting(false)
    }
  }

  const isConfirmValid = confirmText.toLowerCase() === "delete my account"

  return (
    <>
      <div className="my-10 rounded-xl border border-red-500/30 bg-gradient-to-br from-red-950/50 to-red-900/30 p-8 shadow-lg backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Warning Icon */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-600 ring-4 ring-red-950 shadow-xl">
                <FiAlertTriangle className="text-2xl text-white" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-xl font-bold text-red-400 mb-2 flex items-center gap-2">
                <span>Danger Zone</span>
              </h2>
              <h3 className="text-lg font-semibold text-richblack-5 mb-3">
                Delete Account
              </h3>
            </div>

            <div className="space-y-3 text-richblack-100">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <p className="text-sm">
                  Once you delete your account, there is no going back. This action is{" "}
                  <span className="font-semibold text-red-400">permanent and irreversible</span>.
                </p>
              </div>
              
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <p className="text-sm">
                  All your data, including purchased courses, progress, certificates, and profile information will be{" "}
                  <span className="font-semibold text-red-400">permanently deleted</span>.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                <p className="text-sm">
                  You will lose access to all paid courses and content associated with this account.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="mt-4 px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/50 hover:scale-105 flex items-center gap-2 group"
            >
              <FiTrash2 className="text-lg group-hover:rotate-12 transition-transform" />
              Delete My Account
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-11/12 max-w-lg rounded-2xl border border-red-500/30 bg-richblack-900 p-8 shadow-2xl animate-scaleIn">
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
                  <FiAlertTriangle className="text-2xl text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-richblack-5">
                    Confirm Account Deletion
                  </h3>
                  <p className="text-sm text-richblack-300 mt-0.5">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowModal(false)
                  setConfirmText("")
                }}
                className="text-richblack-400 hover:text-richblack-5 transition-colors p-1 hover:bg-richblack-800 rounded-lg"
                disabled={isDeleting}
              >
                <FiX className="text-2xl" />
              </button>
            </div>

            {/* Warning Box */}
            <div className="mb-6 rounded-lg border border-red-500/30 bg-red-950/30 p-4">
              <p className="text-sm text-richblack-100 mb-3">
                You are about to permanently delete the account for:
              </p>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-richblack-800">
                <img
                  src={user?.image}
                  alt="profile"
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-red-500"
                />
                <div>
                  <p className="font-semibold text-richblack-5">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-sm text-richblack-300">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Confirmation Input */}
            <div className="mb-6">
              <label className="text-sm font-medium text-richblack-5 mb-2 block">
                Type <span className="font-bold text-red-400">"delete my account"</span> to confirm
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="delete my account"
                className="w-full rounded-lg border border-richblack-700 bg-richblack-800 px-4 py-3 text-richblack-5 placeholder-richblack-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                disabled={isDeleting}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowModal(false)
                  setConfirmText("")
                }}
                disabled={isDeleting}
                className="flex-1 px-6 py-3 rounded-lg border border-richblack-700 bg-richblack-800 hover:bg-richblack-700 text-richblack-5 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={!isConfirmValid || isDeleting}
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 className="text-lg" />
                    Delete Account
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  )
}