import { useEffect, useRef, useState } from "react";
import { FiUpload, FiCamera, FiCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { updateDisplayPicture } from "../../../../services/operations/SettingsAPI";


export default function ChangeProfilePicture() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("Selected file:", file);
    if (file) {
      setImageFile(file);
      setUploadSuccess(false);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = async () => {
    if (!imageFile) {
      console.error("No file selected!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("displayPicture", imageFile);

      // Log FormData to confirm the file is present
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      await dispatch(updateDisplayPicture(token, formData));
      setUploadSuccess(true);
      setImageFile(null);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Hide success message after 3 seconds
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (error) {
      console.error("Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="rounded-xl border border-richblack-700 bg-gradient-to-br from-richblack-800 to-richblack-900 p-8 shadow-lg">
      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Profile Picture Section */}
        <div className="relative group">
          <div className="relative">
            <img
              src={previewSource || user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-24 h-24 rounded-full object-cover ring-4 ring-richblack-700 group-hover:ring-blue-500 transition-all duration-300 shadow-xl"
            />
            {/* Camera Overlay */}
            <button
              onClick={handleClick}
              disabled={loading}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
              aria-label="Change profile picture"
            >
              <FiCamera className="text-2xl text-white" />
            </button>
            
            {/* Success Badge */}
            {uploadSuccess && (
              <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1.5 ring-4 ring-richblack-800 animate-scaleIn">
                <FiCheck className="text-white text-sm" />
              </div>
            )}
          </div>
          
          {/* Upload Progress Indicator */}
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-4 w-full sm:w-auto">
          <div>
            <h3 className="text-lg font-semibold text-richblack-5 mb-1">
              {user?.firstName} {user?.lastName}
            </h3>
            <p className="text-sm text-richblack-300">
              {user?.email}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/png, image/gif, image/jpeg, image/jpg"
            />
            
            <button
              onClick={handleClick}
              disabled={loading}
              className="px-5 py-2.5 rounded-lg bg-richblack-700 hover:bg-richblack-600 text-richblack-50 font-medium transition-all duration-200 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <span className="flex items-center gap-2">
                <FiCamera className="text-lg" />
                Select Image
              </span>
            </button>

            {imageFile && (
              <button
                onClick={handleFileUpload}
                disabled={loading}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
              >
                <span className="flex items-center gap-2">
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <FiUpload className="text-lg" />
                      Upload
                    </>
                  )}
                </span>
              </button>
            )}
          </div>

          {/* Success Message */}
          {uploadSuccess && (
            <div className="flex items-center gap-2 text-green-400 text-sm animate-slideIn">
              <FiCheck className="text-lg" />
              <span>Profile picture updated successfully!</span>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            transform: translateX(-10px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}