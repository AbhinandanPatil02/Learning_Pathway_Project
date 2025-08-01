import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ContactUS.css";

const ContactUS = () => {
  return (
    <div className="contact-container py-5">
      <div className="container contact-card shadow-lg rounded p-4 p-md-5">
        <div className="row justify-content-center">
          {/* Full Width Form */}
          <div className="col-lg-8">
            <h2 className="mb-4 text-center text-dark fw-bold">Get in Touch</h2>
            <p className="text-center text-secondary mb-4">We’d love to hear from you!</p>
            <form>
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control form-control-lg" placeholder="Your name" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-control form-control-lg" placeholder="you@example.com" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Subject</label>
                <input type="text" className="form-control form-control-lg" placeholder="Subject" required />
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control form-control-lg" rows="5" placeholder="Write your message..." required></textarea>
              </div>
              <button type="submit" className="btn btn-dark btn-lg w-100">
                Send Message →
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUS;


