import React from "react";
import { User } from "lucide-react"; // For the user icon
import "./Navbar.css"; // Create this CSS file for custom styles

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* Web Logo */}
      <a className="navbar-brand m-3" href="#">
        <img
          src="path-to-your-logo.png" // Replace with the path to your logo
          alt="Web Logo"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {/* <span className="logo-text">Logo</span> */}
      </a>

      {/* Navbar Toggler for Mobile */}
      
      <button
        className="navbar-toggler m-3"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Navbar Links */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active m-3">
            <a className="nav-link" href="#">
              Home <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item m-3">
            <a className="nav-link" href="#">
              Explore Tech
            </a>
          </li>
          <li className="nav-item m-3">
            <a className="nav-link" href="#">
              About Us
            </a>
          </li>
          <li className="nav-item m-3">
            <a className="nav-link" href="#">
              Contact
            </a>
          </li>
        </ul>

        {/* User Icon */}
        <div className="ml-auto">
        
          <a className="nav-link" href="#">
            <User size={30} /> {/* Increase the size of the user icon */}
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;