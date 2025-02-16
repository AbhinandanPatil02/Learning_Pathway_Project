import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CheckCircle, Circle } from "lucide-react"; // Icons
import "./CoursePathway.css";

const CoursePathway = () => {
  const { id } = useParams();
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

        let fetchedCourse = response.data;
        if (Array.isArray(fetchedCourse) && fetchedCourse.length > 0) {
          fetchedCourse = fetchedCourse[0]; 
        }

        setCourse(fetchedCourse);
        setProgress(fetchedCourse.progress || {});
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course:", error);
        setError(error.response?.data?.message || "Failed to fetch course.");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  // Calculate progress percentage
  const totalLessons = course?.pathway?.reduce((sum, section) => sum + section.children.length, 0) || 0;
  const completedLessons = Object.values(progress).filter((val) => val).length;
  const progressPercentage = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const handleCheckboxChange = async (pathwayName) => {
    setProgress((prev) => {
      const updatedProgress = { ...prev, [pathwayName]: !prev[pathwayName] };
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

  if (loading) return <div className="text-center mt-4">Loading...</div>;
  if (error) return <div className="text-center mt-4 text-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">{course?.technology} Learning Pathway</h2>

      {/* Progress Bar */}
      <div className="progress-container text-center mb-4">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <p>{progressPercentage}% Completed</p>
      </div>

      {/* Pathway List */}
      <div className="pathway-list">
        {course?.pathway && course.pathway.length > 0 ? (
          course.pathway.map((section, index) => (
            <div key={index} className="section">
              <h4 className="section-title">{section.name}</h4>
              <div className="section-pathway">
                {section.children?.map((child, idx) => (
                  <div key={idx} className="lesson-card">
                    <button
                      className={`lesson-checkbox ${progress[child.name] ? "checked" : ""}`}
                      onClick={() => handleCheckboxChange(child.name)}
                    >
                      {progress[child.name] ? <CheckCircle size={24} color="green" /> : <Circle size={24} />}
                    </button>
                    <span className="lesson-name">{child.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No pathways available.</p>
        )}
      </div>
    </div>
  );
};

export default CoursePathway;
