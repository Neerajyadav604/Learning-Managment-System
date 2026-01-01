const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(process.env.REACT_APP_BASE_URL)

export const endpoints = {
  LOGIN_API: `${`${BASE_URL}`}/login`,
  SIGNUP_API: `${`${BASE_URL}`}/signup`,
  SEND_OTP: `${`${BASE_URL}`}/sendotp`,
  RESETPASSTOKEN_API: `${`${BASE_URL}`}/auth/reset-password-token`,
  RESETPASSWORD_API:`${`${BASE_URL}`}/auth/reset-password`
  
};

export const categories = {
  CATEGORIES_API: `${BASE_URL}` + "/showAllCategories",
};

export const categoryEndpoints = {
  CREATE_CATEGORY_API: `${BASE_URL}` + "/category/create",
GET_ALL_CATEGORIES_API: `${BASE_URL}` + "/showAllCategories",
  GET_CATEGORY_DETAILS_API: `${BASE_URL}` + "/getCategoryPageDetails",
  UPDATE_CATEGORY_API: `${BASE_URL}` + "/category/update",
  DELETE_CATEGORY_API: `${BASE_URL}` + "/category/delete",
};

export const contactusEndpoint = {
  CONTACT_US_API: `${BASE_URL}` + "/contact",
}

export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: `${`${BASE_URL}` }/rating/all`,
}

export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: `${BASE_URL}` + "/updateDisplayPicture",
  UPDATE_PROFILE_API: `${BASE_URL}` + "/updateProfile",
  CHANGE_PASSWORD_API: `${BASE_URL}` + "/changepassword",
  DELETE_PROFILE_API: `${BASE_URL}` + "/profile/deleteProfile",
}

export const profileEndpoints = {
  GET_USER_DETAILS_API: `${BASE_URL}` + "/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: `${BASE_URL}` + "/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: `${BASE_URL}` + "/instructorDashboard",
}

export const studentEndpoints = {
  COURSE_PAYMENT_API: `${BASE_URL}` + "/capturePayment",
  COURSE_VERIFY_API: `${BASE_URL}` + "/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: `${BASE_URL}` + "/sendPaymentSuccessEmail",
}

export const courseEndpoints = {
  GET_ALL_COURSE_API: `${BASE_URL}` + "/getAllCourses",
  COURSE_DETAILS_API: `${BASE_URL}` + "/getFullCourseDetails",
  EDIT_COURSE_API: `${BASE_URL}` + "/editCourse",
  COURSE_CATEGORIES_API: `${BASE_URL}` + "/showAllCategories",
  CREATE_COURSE_API: `${BASE_URL}` + "/createCourse",
  CREATE_SECTION_API: `${BASE_URL}` + "/addSection",
  CREATE_SUBSECTION_API: `${BASE_URL}` + "/addSubSection",
  UPDATE_SECTION_API: `${BASE_URL}` + "/updateSection",
  UPDATE_SUBSECTION_API: `${BASE_URL}` + "/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: `${BASE_URL}` + "/getInstructorCourses",
  DELETE_SECTION_API: `${BASE_URL}` + "/deleteSection",
  DELETE_SUBSECTION_API: `${BASE_URL}` + "/deleteSubSection",
  DELETE_COURSE_API: `${BASE_URL}` + "/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    `${BASE_URL}` + "/getFullCourseDetails",
  LECTURE_COMPLETION_API: `${BASE_URL}` + "/updateCourseProgress",
  CREATE_RATING_API: `${BASE_URL}` + "/createRating",
}

export const catalogData = {
  CATALOGPAGEDATA_API: `${BASE_URL}` + "/getCategoryPageDetails",
}