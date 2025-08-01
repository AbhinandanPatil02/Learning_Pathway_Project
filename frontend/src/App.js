
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
import Notes from './components/Notes';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactUS from "./components/ContactUS";
import Quiz from "./components/Quiz";
import AboutUs from "./components/Aboutus";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const Home = ({ technology, setTechnology, handleGenerate, pathway, error }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Update `isMobile` on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSave = async () => {
    if (!pathway || Object.keys(pathway).length === 0) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authorization token is missing. Please log in.");
      return;
    }

    const payload = { technology, pathway };

    try {
      setIsSaving(true);
      const response = await axios.post(`${API_BASE_URL}/courses/save`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Pathway saved successfully!");
      console.log("Saved Response:", response.data);
    } catch (error) {
      console.error("Error saving pathway:", error);
      toast.error("Failed to save pathway. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const styles = {
    container: {
      padding: "20px",
      maxWidth: "100%",
      boxSizing: "border-box",
      position: "relative",
    },
    title: {
      textAlign: "center",
      fontSize: "2rem",
      marginBottom: "20px",
    },
    inputSection: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "10px",
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      width: "100%",
      maxWidth: "300px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      boxSizing: "border-box",
    },
    generateButton: {
      padding: "10px 20px",
      backgroundColor: technology.trim() ? "#007bff" : "#ccc",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: technology.trim() ? "pointer" : "not-allowed",
      whiteSpace: "nowrap",
    },
    saveButtonDesktop: {
      position: "absolute",
      top: "20px",
      right: "20px",
      padding: "10px 20px",
      backgroundColor: pathway && Object.keys(pathway).length > 0 ? "#28a745" : "#ccc",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: pathway && Object.keys(pathway).length > 0 ? "pointer" : "not-allowed",
      zIndex: 1000,
      display: isMobile ? "none" : "block",
    },
    saveButtonMobile: {
      display: isMobile ? "block" : "none",
      width: "100%",
      marginTop: "20px",
      padding: "10px 0",
      backgroundColor: pathway && Object.keys(pathway).length > 0 ? "#28a745" : "#ccc",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: pathway && Object.keys(pathway).length > 0 ? "pointer" : "not-allowed",
    },
    errorText: {
      color: "red",
      textAlign: "center",
      marginBottom: "10px",
    },
    graphWrapper: {
      maxWidth: "100%",
      overflowX: "auto",
    },
  };

  return (
    <div style={styles.container}>
      {/* Save Button for Desktop (Top Right) */}
      <button
        onClick={handleSave}
        disabled={!pathway || Object.keys(pathway).length === 0 || isSaving}
        style={styles.saveButtonDesktop}
      >
        {isSaving ? "Saving..." : "Save"}
      </button>

      {/* Title */}
      <h1 style={styles.title}>Learning Pathway Generator</h1>

      {/* Input + Generate */}
      <div style={styles.inputSection}>
        <input
          type="text"
          placeholder="Enter a technology..."
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleGenerate} disabled={!technology.trim()} style={styles.generateButton}>
          Generate Pathway
        </button>
      </div>

      {/* Error Message */}
      {error && <p style={styles.errorText}>{error}</p>}

      {/* Display Graph */}
      {pathway && Object.keys(pathway).length > 0 && (
        <div style={styles.graphWrapper}>
          <PathwayGraph pathway={pathway} />
        </div>
      )}

      {/* Save Button for Mobile (At bottom) */}
      {pathway && Object.keys(pathway).length > 0 && (
        <button
          onClick={handleSave}
          disabled={isSaving}
          style={styles.saveButtonMobile}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      )}
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
      const response = await axios.post(`${API_BASE_URL}/pathways/generate`, { technology });

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
        <Route path="/contact"element={<ContactUS/>}></Route>
        <Route path="/quiz" element={<Quiz/>}></Route>
        <Route path="/notes" element={<Notes/>}></Route>
        <Route path="/about" element={<AboutUs/>} ></Route>
        
      </Routes>
    </Router>
  );
};


export default App;
