import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      handlePreview(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
    noClick: true,
    multiple: false,
  });

  // ✅ Use blob URL instead of Base64
  const handlePreview = (file) => {
    if (previewSource) {
      URL.revokeObjectURL(previewSource); // cleanup old preview
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewSource(objectUrl);
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue, name]);

  const handleCancel = () => {
    if (previewSource) {
      URL.revokeObjectURL(previewSource);
    }
    setPreviewSource("");
    setSelectedFile(null);
    setValue(name, null);
  };

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewSource) {
        URL.revokeObjectURL(previewSource);
      }
    };
  }, [previewSource]);

  const handleBrowseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col space-y-3">
      <label className="text-sm font-medium text-richblack-5" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-400">*</sup>}
      </label>

      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`${
          isDragActive ? "bg-richblack-600 border-blue-500" : "bg-richblack-700"
        } relative flex min-h-[250px] cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-richblack-500 transition-all duration-300 hover:border-richblack-400 overflow-hidden group`}
      >
        {/* Hidden input */}
        <input
          {...getInputProps()}
          ref={inputRef}
          id={name}
          style={{ display: "none" }}
        />

        {previewSource ? (
          <div className="flex w-full flex-col p-6 relative">
            {!video ? (
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={previewSource}
                  alt="Preview"
                  className="h-full w-full rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-richblack-900/50 to-transparent pointer-events-none" />
              </div>
            ) : (
              <div className="rounded-lg overflow-hidden">
                <Player aspectRatio="16:9" playsInline src={previewSource} />
              </div>
            )}

            {!viewData && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancel();
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-richblack-600 text-richblack-5 font-medium hover:bg-richblack-500 transition-all duration-200 self-center"
              >
                Remove & Replace
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6 text-center">
            <div className="relative">
              <div className="grid aspect-square w-16 place-items-center rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-500/40">
                <FiUploadCloud className="text-3xl text-blue-400 transition-transform duration-300 group-hover:translate-y-[-2px]" />
              </div>
              {isDragActive && (
                <div className="absolute inset-0 rounded-full bg-blue-500/20 animate-ping" />
              )}
            </div>

            <p className="mt-4 max-w-[280px] text-sm text-richblack-200">
              {isDragActive ? (
                <span className="text-blue-400 font-semibold">
                  Drop your {!video ? "image" : "video"} here
                </span>
              ) : (
                <>Drag and drop {!video ? "an image" : "a video"} here</>
              )}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 justify-center text-xs text-richblack-400">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-richblack-400" />
                <span>Aspect ratio 16:9</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-richblack-400" />
                <span>Recommended 1024x576</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Browse button */}
      {!previewSource && (
        <button
          type="button"
          onClick={handleBrowseClick}
          className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-500 transition-all duration-200 self-center"
        >
          Click to browse
        </button>
      )}

      {errors[name] && (
        <span className="ml-1 text-xs tracking-wide text-pink-400 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {label} is required
        </span>
      )}
    </div>
  );
}
