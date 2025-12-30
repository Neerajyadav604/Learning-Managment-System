import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { FiPlus, FiX } from "react-icons/fi"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editCourse, course } = useSelector((state) => state.course)
  const [requirement, setRequirement] = useState("")
  const [requirementsList, setRequirementsList] = useState([])

  useEffect(() => {
    if (editCourse) {
      setRequirementsList(course?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
  }, [])

  useEffect(() => {
    setValue(name, requirementsList)
  }, [requirementsList])

  const handleAddRequirement = () => {
    if (requirement.trim()) {
      setRequirementsList([...requirementsList, requirement.trim()])
      setRequirement("")
    }
  }

  const handleRemoveRequirement = (index) => {
    const updatedRequirements = [...requirementsList]
    updatedRequirements.splice(index, 1)
    setRequirementsList(updatedRequirements)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddRequirement()
    }
  }

  return (
    <div className="flex flex-col space-y-3">
      <label className="text-sm font-medium text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-400">*</sup>
      </label>

      <div className="flex gap-2">
        <div className="relative flex-1 group">
          <input
            type="text"
            id={name}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a requirement and press Enter or click Add"
            className="form-style w-full rounded-xl border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 placeholder-richblack-400 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-10" />
        </div>
        <button
          type="button"
          onClick={handleAddRequirement}
          className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border-2 border-yellow-500/20 px-5 py-3 font-semibold text-yellow-50 transition-all duration-300 hover:border-yellow-500/40 hover:shadow-lg hover:shadow-yellow-500/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <FiPlus className="text-lg transition-transform group-hover:rotate-90 duration-300" />
          <span>Add</span>
        </button>
      </div>

      {requirementsList.length > 0 && (
        <div className="space-y-2 mt-4">
          <p className="text-xs font-medium text-richblack-300 uppercase tracking-wide">
            Added Requirements ({requirementsList.length})
          </p>
          <ul className="space-y-2">
            {requirementsList.map((req, index) => (
              <li
                key={index}
                className="group/item flex items-start gap-3 rounded-lg bg-richblack-700/50 border border-richblack-600/50 px-4 py-3 transition-all duration-200 hover:border-richblack-500/50 hover:bg-richblack-700"
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/20 flex-shrink-0 mt-0.5">
                  <span className="text-xs font-medium text-blue-400">
                    {index + 1}
                  </span>
                </div>
                <span className="flex-1 text-sm text-richblack-5 leading-relaxed">
                  {req}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveRequirement(index)}
                  className="flex items-center justify-center w-7 h-7 rounded-lg text-richblack-400 hover:text-pink-400 hover:bg-pink-500/10 transition-all duration-200 opacity-0 group-hover/item:opacity-100 flex-shrink-0"
                  title="Remove requirement"
                >
                  <FiX className="text-lg" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {requirementsList.length === 0 && (
        <div className="flex items-center justify-center py-8 rounded-lg border-2 border-dashed border-richblack-600 bg-richblack-800/30">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-richblack-700 border border-richblack-600 flex items-center justify-center mx-auto mb-3">
              <FiPlus className="text-xl text-richblack-400" />
            </div>
            <p className="text-sm text-richblack-400">No requirements added yet</p>
            <p className="text-xs text-richblack-500 mt-1">Add your first requirement above</p>
          </div>
        </div>
      )}

      {errors[name] && (
        <span className="ml-1 text-xs tracking-wide text-pink-400 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {label} is required
        </span>
      )}
    </div>
  )
}