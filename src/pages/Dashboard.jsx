import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axiosInstance from "../services/axiosInstance";
import "./Dashboard.css";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [showAddCoursePopup, setShowAddCoursePopup] = useState(false);
  const [course, setCourse] = useState({
    name: "",
    code: "",
    duration: "",
    description: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axiosInstance.get("/course/get");
      setCourses(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch courses:", error);
    }
  };

  const handleAddCourseSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/course/add", course);
      alert("✅ Course added successfully!");
      setShowAddCoursePopup(false);
      setCourse({ name: "", code: "", duration: "", description: "" });
      fetchCourses();
    } catch (err) {
      alert("❌ Failed to add course.");
      console.error(err);
    }
  };

  return (
    <>
      <Navbar />

      <header className="hero1">
        <div className="hero-content">
          <h1>Welcome to AcademiaTech Management</h1>
          <p>Manage courses efficiently—all in one place.</p>
          <button
            className="register-institute-btn"
            onClick={() => setShowAddCoursePopup(true)}
          >
            Add Course
          </button>
        </div>
      </header>

      <section className="features">
        {courses.length === 0 ? (
          <p>Loading courses...</p>
        ) : (
          courses.map((course) => (
            <div className="feature-card" key={course.courseId}>
              <h3>📚 {course.name}</h3>
              <p>{course.description}</p>
              <Link to={`/departments/${course.courseId}`}>
                <button className="btn">Go to Course</button>
              </Link>
            </div>
          ))
        )}
      </section>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} InstituteApp. All rights reserved.</p>
      </footer>

      {showAddCoursePopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Add Course</h2>
            <form onSubmit={handleAddCourseSubmit} className="register-form">
              <input
                type="text"
                placeholder="Course Name"
                value={course.name}
                onChange={(e) =>
                  setCourse({ ...course, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Course Code"
                value={course.code}
                onChange={(e) =>
                  setCourse({ ...course, code: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Duration (in hours or days)"
                value={course.duration}
                onChange={(e) =>
                  setCourse({ ...course, duration: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                value={course.description}
                onChange={(e) =>
                  setCourse({ ...course, description: e.target.value })
                }
                required
              ></textarea>
              <div className="button-group">
                <button type="submit" className="save-button">
                  Add
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowAddCoursePopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
