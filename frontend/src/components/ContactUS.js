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






// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./ContactUS.css";

// const ContactUS = () => {
//   return (
//     <div className="container d-flex justify-content-center align-items-center vh-100">
//       <div className="contact-us row shadow-lg rounded bg-white p-5">
        
//         {/* Left Side (Icon) */}
//         <div className="col-md-5 d-flex justify-content-center align-items-center">
//           <img src="https://cdn-icons-png.flaticon.com/512/535/535188.png" alt="Mail Icon" className="img-fluid contact-icon" />
//         </div>

//         {/* Right Side (Form) */}
//         <div className="col-md-7">
//           <h2 className="text-center mb-4 display-6">Get in Touch</h2>
//           <form>
//             <div className="mb-4">
//               <input type="text" className="form-control form-control-lg" placeholder="Name" required />
//             </div>
//             <div className="mb-4">
//               <input type="email" className="form-control form-control-lg" placeholder="Email" required />
//             </div>
//             <div className="mb-4">
//               <input type="text" className="form-control form-control-lg" placeholder="Subject" required />
//             </div>
//             <div className="mb-4">
//               <textarea className="form-control form-control-lg" rows="5" placeholder="Message" required></textarea>
//             </div>
//             <button type="submit" className="btn btn-success btn-lg w-100">
//               Send Email →
//             </button>
//           </form>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ContactUS;

