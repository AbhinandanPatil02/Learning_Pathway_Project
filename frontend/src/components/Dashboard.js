import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css"; // Custom CSS for additional styling

const Dashboard = () => {
  const [courses, setCourses] = useState([
    { technology: "C++", progress: 67 },
    { technology: "React", progress: 47 },
    { technology: "Backend", progress: 10 },
  ]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        if (!token) {
          console.error("No token found in localStorage");
          return; // Exit if no token is found
        }

        const response = await axios.get("http://localhost:5000/api/courses/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass token dynamically
          },
        });

        setCourses(response.data); // Set courses from the response
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Function to determine ring color based on progress
  const getRingColor = (progress) => {
    if (progress <= 20) return "red";
    if (progress <= 40) return "yellow";
    if (progress <= 70) return "lightgreen";
    return "green";
  };

  return (
    <div className="container mt-4">
      <h2 className="text-left mb-4 title">My <br /> Learnings</h2>
      <div className="row">
        {courses.map((course, index) => (
          <div key={index} className="col-md-3 mx-3 mb-4">
            <div className="card learning-card text-center p-4">
              <h5 className="card-title">{course.technology}</h5>
              <div className="progress-circle">
                <svg
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  className="progress-ring"
                >
                  <circle className="progress-bg" cx="50" cy="50" r="40" />
                  <circle
                    className="progress-bar"
                    cx="50"
                    cy="50"
                    r="40"
                    strokeDasharray="251.2"
                    strokeDashoffset={`${
                      251.2 - (251.2 * course.progress) / 100
                    }`}
                    stroke={getRingColor(course.progress)}
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    className="progress-text"
                    dy="0.3em"
                  >
                    {course.progress}%
                  </text>
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
