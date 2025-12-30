import React from "react";

import ContactDetails from "../components/ContactPage/ContactDetails.jsx";
import ContactForm from "../components/ContactPage/contactForm.jsx";
import ReviewSlider from "../components/Common/ReviewSlider.jsx";


const Contact = () => {
  return (
    <div className="bg-white text-blue-900">
      {/* Contact Section */}
      <section className="mx-auto mt-24 flex w-11/12 max-w-maxContent flex-col lg:flex-row gap-12">
        {/* Contact Details */}
        <div className="lg:w-[40%] bg-blue-50 rounded-xl p-8 shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">
            Get in Touch
          </h2>
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%] bg-blue-50 rounded-xl p-8 shadow-md">
          <h2 className="text-3xl font-bold mb-6 text-blue-700">
            Send us a Message
          </h2>
          <ContactForm />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="relative mx-auto my-20 w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 flex bg-blue-100 rounded-xl p-8 shadow-md">
        <h1 className="text-center text-4xl font-extrabold text-blue-900 mb-6">
          Reviews from Learners
        </h1>
        <ReviewSlider />
      </section>

      {/* Footer */}
    
    </div>
  );
};

export default Contact;
