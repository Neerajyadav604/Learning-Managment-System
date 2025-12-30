import { useSelector } from "react-redux"

import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart)

  return (
    <div className="mt-10 min-h-screen p-6 md:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-richblack-5 mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Shopping Cart
        </h1>
        
        {/* Items Counter Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-richblack-800 to-richblack-900 border border-richblack-700 rounded-full backdrop-blur-sm">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <p className="font-semibold text-richblack-300">
            {totalItems} {totalItems === 1 ? 'Course' : 'Courses'} in Cart
          </p>
        </div>
      </div>

      {total > 0 ? (
        <div className="mt-8 flex flex-col-reverse items-start gap-6 lg:flex-row lg:gap-8">
          {/* Cart Items - Takes more space */}
          <div className="w-full lg:flex-1">
            <RenderCartCourses />
          </div>
          
          {/* Total Amount Sidebar - Sticky on desktop */}
          <div className="w-full lg:w-96 lg:sticky lg:top-24">
            <RenderTotalAmount />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          {/* Empty Cart Illustration */}
          <div className="relative mb-8">
            <div className="w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-richblack-700">
              <svg className="w-20 h-20 text-richblack-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div className="absolute inset-0 blur-3xl bg-blue-500/5 animate-pulse"></div>
            
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500/20 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-500/20 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
          </div>
          
          <h3 className="text-3xl font-bold text-richblack-100 mb-3">Your Cart is Empty</h3>
          <p className="text-richblack-300 max-w-md mb-8 text-lg">
            Looks like you haven't added any courses yet. Explore our collection and find courses that inspire you!
          </p>
          
          {/* CTA Button */}
         
          
          {/* Optional: Popular categories */}
          <div className="mt-12 w-full max-w-2xl">
          
            <div className="flex flex-wrap gap-3 justify-center">
             
            </div>
          </div>
        </div>
      )}
    </div>
  )
}