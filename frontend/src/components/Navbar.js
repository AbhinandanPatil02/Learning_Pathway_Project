
import React, { useState } from "react";
import { User } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setDropdownOpen(false);
    navigate("/login");
    window.location.reload();
  };

  const handleNavCollapse = () => setIsNavCollapsed((prev) => !prev);

  // Close dropdown on outside click (optional enhancement)
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".user-dropdown") &&
        dropdownOpen
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const navLinks = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/", label: "Explore Tech" },
    { to: "/about", label: "About Us" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <Link className="navbar-brand d-flex align-items-center mx-3" to="/">
        <img
          src={logo}
          alt="Logo"
          width="50"
          height="50"
          className="d-inline-block align-top"
        />
        {/* Optional logo text next to logo */}
        {/* <span className="logo-text ml-2">YourBrand</span> */}
      </Link>

      <button
        className="navbar-toggler mx-3"
        type="button"
        onClick={handleNavCollapse}
        aria-controls="navbarNav"
        aria-expanded={!isNavCollapsed}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav mr-auto">
          {navLinks.map(({ to, label }) => (
            <li
              key={to}
              className={`nav-item mx-3 ${
                location.pathname === to ? "active" : ""
              }`}
            >
              <Link to={to} className="nav-link">
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="user-dropdown ml-auto position-relative">
          <button
            className="nav-link user-icon-btn btn btn-link"
            onClick={toggleDropdown}
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-label="User menu"
          >
            <User size={30} />
          </button>

          {dropdownOpen && (
            <div
              className="dropdown-menu show"
              style={{ position: "absolute", right: 0 }}
              role="menu"
            >
              <button
                className="dropdown-item"
                onClick={() => {
                  setDropdownOpen(false);
                  navigate("/profile");
                }}
                role="menuitem"
              >
                Profile
              </button>
              <button
                className="dropdown-item"
                onClick={handleLogout}
                role="menuitem"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;







// import React, { useState } from "react";
// import { User } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./Navbar.css";
// import logo from "../assets/logo.png";

// const Navbar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isNavCollapsed, setIsNavCollapsed] = useState(true); // navbar toggle
//   const navigate = useNavigate();
//   const location = useLocation();

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setDropdownOpen(false);
//     navigate("/login");
//     window.location.reload();
//   };

//   const handleNavCollapse = () => {
//     setIsNavCollapsed(!isNavCollapsed);
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <a className="navbar-brand m-3" href="#">
//         <img src={logo} alt="Logo" width="50" height="50" className="d-inline-block align-top" />
//       </a>

//       {/* React-controlled toggler */}
//       <button
//         className="navbar-toggler m-3"
//         type="button"
//         onClick={handleNavCollapse}
//         aria-controls="navbarNav"
//         aria-expanded={!isNavCollapsed}
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       {/* Controlled collapse */}
//       <div className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarNav">
//         <ul className="navbar-nav mr-auto">
//           <li className={`nav-item m-3 ${location.pathname === "/dashboard" ? "active" : ""}`}>
//             <a className="nav-link" href="/dashboard">Dashboard</a>
//           </li>
//           <li className={`nav-item m-3 ${location.pathname === "/" ? "active" : ""}`}>
//             <a className="nav-link" href="/">Explore Tech</a>
//           </li>
//           <li className={`nav-item m-3 ${location.pathname === "/about" ? "active" : ""}`}>
//             <a className="nav-link" href="/about">About Us</a>
//           </li>
//           <li className={`nav-item m-3 ${location.pathname === "/contact" ? "active" : ""}`}>
//             <a className="nav-link" href="/contact">Contact</a>
//           </li>
//         </ul>

//         {/* User Dropdown */}
//         <div className="ml-auto user-dropdown position-relative">
//           <button className="nav-link user-icon-btn btn btn-link" onClick={toggleDropdown}>
//             <User size={30} />
//           </button>

//           {dropdownOpen && (
//             <div className="dropdown-menu show" style={{ position: "absolute", right: 0 }}>
//               <button className="dropdown-item" onClick={() => {
//                 setDropdownOpen(false);
//                 navigate("/profile");
//               }}>
//                 Profile
//               </button>
//               <button className="dropdown-item" onClick={handleLogout}>Logout</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

