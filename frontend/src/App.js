// import React, { useState } from "react";
// import axios from "axios";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import PathwayGraph from "./components/PathwayGraph";
// import "./components/GraphStyles.css";
// import Navbar from "./components/Navbar";
// import SignUp from "./components/SignUp";
// import Login from "./components/Login";
// import Dashboard from "./components/Dashboard";

// const Home = ({ technology, setTechnology, handleGenerate, pathway, error }) => {
//   return (
//     <div>
      
//       <div style={{ padding: "20px" }}>
//         <h1 style={{ textAlign: "center" }}>Learning Pathway Generator</h1>
//         <div style={{ textAlign: "center", marginBottom: "20px" }}>
//           <input
//             type="text"
//             placeholder="Enter a technology..."
//             value={technology}
//             onChange={(e) => setTechnology(e.target.value)}
//             style={{
//               padding: "10px",
//               width: "300px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />
//           <button
//             onClick={handleGenerate}
//             disabled={!technology.trim()} // Disable button if input is empty
//             style={{
//               marginLeft: "10px",
//               padding: "10px 20px",
//               backgroundColor: technology.trim() ? "#007bff" : "#ccc",
//               color: "#fff",
//               border: "none",
//               borderRadius: "5px",
//               cursor: technology.trim() ? "pointer" : "not-allowed",
//             }}
//           >
//             Generate Pathway
//           </button>
//         </div>
//         {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
//         {pathway && Object.keys(pathway).length > 0 && (
//           <PathwayGraph pathway={pathway} />
//         )}
//       </div>
//     </div>
//   );
// };

// const App = () => {
//   const [technology, setTechnology] = useState("");
//   const [pathway, setPathway] = useState(null); // Initialize as null
//   const [error, setError] = useState("");

//   const handleGenerate = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/pathways/generate", {
//         technology,
//       });

//       if (response.data.pathway) {
//         setPathway(response.data.pathway); // Set pathway data
//         setError("");
//       } else {
//         setError("Unexpected data format from API.");
//       }
//     } catch (err) {
//       setError("Failed to fetch pathway data.");
//       console.error(err);
//     }
//   };

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <Home
//               technology={technology}
//               setTechnology={setTechnology}
//               handleGenerate={handleGenerate}
//               pathway={pathway}
//               error={error}
//             />
//           }
//         />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/login" element={<Login/>}/>
//         <Route path="/dashboard" element={<Dashboard/>}/>
//       </Routes>
//     </Router>
//   );
// };

// export default App;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import PathwayGraph from "./components/PathwayGraph";
import "./components/GraphStyles.css";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CoursePathway from "./components/CoursePathway";

const Home = ({ technology, setTechnology, handleGenerate, pathway, error }) => {
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Learning Pathway Generator</h1>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter a technology..."
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={handleGenerate}
          disabled={!technology.trim()}
          style={{
            marginLeft: "10px",
            padding: "10px 20px",
            backgroundColor: technology.trim() ? "#007bff" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: technology.trim() ? "pointer" : "not-allowed",
          }}
        >
          Generate Pathway
        </button>
      </div>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {pathway && Object.keys(pathway).length > 0 && <PathwayGraph pathway={pathway} />}
    </div>
  );
};

const App = () => {
  const [technology, setTechnology] = useState("");
  const [pathway, setPathway] = useState(null);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleGenerate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/pathways/generate", { technology });

      if (response.data.pathway) {
        setPathway(response.data.pathway);
        setError("");
      } else {
        setError("Unexpected data format from API.");
      }
    } catch (err) {
      setError("Failed to fetch pathway data.");
      console.error(err);
    }
  };

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={<Home technology={technology} setTechnology={setTechnology} handleGenerate={handleGenerate} pathway={pathway} error={error} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/courses/:id" element={<CoursePathway/>} ></Route>
      </Routes>
    </Router>
  );
};

export default App;
