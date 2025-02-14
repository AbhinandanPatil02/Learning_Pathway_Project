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
        const response = await axios.get("http://localhost:5000/api/courses/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YThmMWM5ZGQzOTNlODYxYTAzNzI3ZSIsImlhdCI6MTczOTUyNDU1MCwiZXhwIjoxNzM5NTI4MTUwfQ.0ox2Y51IUWprD0SSdNBxOrlbLVmKQ3sZKJ7Vq-ktcYM`,
          },
        });
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 title">My Learning</h2>
      <div className="row justify-content-center">
        {courses.map((course, index) => (
          <div key={index} className="col-md-3 mx-3 mb-4">
            <div className="card learning-card text-center p-3">
              <h5 className="card-title">{course.technology}</h5>
              <div className="progress-circle">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle className="progress-bg" cx="50" cy="50" r="40" />
                  <circle
                    className="progress-bar"
                    cx="50" cy="50"
                    r="40"
                    strokeDasharray="251.2"
                    strokeDashoffset={`${
      251.2 - (251.2 * course.progress) / 100
    }`}
                  />
                  <text x="50" y="55" textAnchor="middle" className="progress-text">
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
