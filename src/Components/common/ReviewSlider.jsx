import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"

// Icons
import { FaStar } from "react-icons/fa"

// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

// Get apiFunction and the endpoint
import { apiconnector } from "../../services/Apiconector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      try {
        const { data } = await apiconnector(
          "GET",
          ratingsEndpoints.REVIEWS_DETAILS_API
        )
        if (data?.success) {
          setReviews(data?.data)
        }
      } catch (err) {
        console.error("Error fetching reviews:", err)
      }
    })()
  }, [])

  return (
    <div className="relative w-full overflow-hidden py-16">
      {/* Gradient Background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent" />
      
      {/* Ambient Glow Effects */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      
      <div className="relative mx-auto max-w-maxContentTab lg:max-w-maxContent">
        {reviews.length === 0 ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <FaStar className="h-8 w-8 text-purple-400" />
              </div>
              <p className="text-lg font-medium text-slate-300">
                No reviews available yet.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Be the first to share your experience!
              </p>
            </div>
          </div>
        ) : (
          <Swiper
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 32,
              },
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className="!pb-14"
          >
            {reviews.map((review, i) => (
              <SwiperSlide key={i}>
                <div className="group relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 to-slate-800/50 p-[1px] backdrop-blur-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-blue-500/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  
                  {/* Card Content */}
                  <div className="relative h-full rounded-3xl bg-slate-900/95 p-6 backdrop-blur-sm">
                    {/* Decorative Element */}
                    <div className="absolute right-4 top-4 h-20 w-20 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-2xl transition-all duration-500 group-hover:scale-150" />
                    
                    {/* User Info */}
                    <div className="relative mb-5 flex items-start gap-4">
                      <div className="relative">
                        <img
                          src={
                            review?.user?.image
                              ? review?.user?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                          }
                          alt={`${review?.user?.firstName} ${review?.user?.lastName}`}
                          className="h-14 w-14 rounded-2xl border border-slate-700/50 object-cover shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:border-purple-500/30"
                        />
                        <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 shadow-lg">
                          <FaStar className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex-1 overflow-hidden">
                        <h3 className="truncate text-lg font-bold text-white transition-colors duration-300 group-hover:text-purple-300">
                          {`${review?.user?.firstName} ${review?.user?.lastName}`}
                        </h3>
                        <p className="truncate text-sm font-medium text-slate-400">
                          {review?.course?.courseName}
                        </p>
                      </div>
                    </div>

                    {/* Review Text */}
                    <div className="relative mb-5 min-h-[72px]">
                      <p className="text-sm leading-relaxed text-slate-300/90">
                        {review?.review.split(" ").length > truncateWords
                          ? `${review?.review
                              .split(" ")
                              .slice(0, truncateWords)
                              .join(" ")}...`
                          : review?.review}
                      </p>
                    </div>

                    {/* Rating Section */}
                    <div className="relative flex items-center justify-between rounded-2xl bg-slate-800/50 px-4 py-3 backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black text-transparent bg-gradient-to-br from-yellow-400 to-orange-500 bg-clip-text">
                          {review.rating.toFixed(1)}
                        </span>
                        <div className="h-6 w-[1px] bg-slate-700" />
                        <ReactStars
                          count={5}
                          value={review.rating}
                          size={18}
                          edit={false}
                          activeColor="#fbbf24"
                          color="#334155"
                          emptyIcon={<FaStar />}
                          fullIcon={<FaStar />}
                        />
                      </div>
                      
                      {/* Verified Badge */}
                      <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Verified
                      </div>
                    </div>

                    {/* Shimmer Effect on Hover */}
                    <div className="pointer-events-none absolute inset-0 -translate-x-full rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style jsx>{`
        .swiper-pagination-bullet {
          width: 32px;
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(90deg, #475569 0%, #334155 100%);
          opacity: 1;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 48px;
          background: linear-gradient(90deg, #a855f7 0%, #3b82f6 100%);
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
        }
        .swiper-pagination {
          bottom: 0 !important;
        }
      `}</style>
    </div>
  )
}

export default ReviewSlider