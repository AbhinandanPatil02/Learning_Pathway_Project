import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CoursePathway.css"; // Custom CSS for styling

const CoursePathway = () => {
  const { id } = useParams(); // Get course ID from URL
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("You are not authenticated. Please log in.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/courses/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log("API Response Data:", response.data);

        let fetchedCourse = response.data;
        if (Array.isArray(fetchedCourse) && fetchedCourse.length > 0) {
          fetchedCourse = fetchedCourse[0]; // Handle array response
        }

        setCourse(fetchedCourse);
        setProgress(fetchedCourse.progress || {}); // Ensure progress is an object

        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setError(error.response?.data?.message || "Failed to fetch course.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleCheckboxChange = async (pathwayName) => {
    setProgress((prev) => {
      const updatedProgress = { ...prev, [pathwayName]: !prev[pathwayName] };
      console.log("Updated Progress:", updatedProgress); // ✅ Debugging line
      return updatedProgress;
    });

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/courses/${id}/progress`,
        { progress: { ...progress, [pathwayName]: !progress[pathwayName] } },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-4 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-left mb-4">{course?.technology} Learning Pathway</h2>
      <div className="pathway-list">
        {course?.pathway && course.pathway.length > 0 ? (
          course.pathway.map((section, index) => (
            <div key={index} className="section">
              <h4>{section.name}</h4>
              {section.children?.map((child, idx) => (
                <div key={idx} className="d-flex align-items-center mb-2">
                  <input
                    type="checkbox"
                    checked={progress[child.name] || false}
                    onChange={() => handleCheckboxChange(child.name)}
                    className="me-2"
                  />
                  <span>{child.name}</span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No pathways available.</p>
        )}
      </div>
    </div>
  );
};

export default CoursePathway;
