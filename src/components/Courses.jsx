import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "./Courses.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourseId, setCurrentCourseId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    duration: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/course/get");
        setCourses(response.data);
      } catch (error) {
        setError(
          error.response?.data?.message ||
          "Server not reachable or internal error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchByName = async () => {
        if (searchTerm.length >= 1) {
          try {
            const response = await axiosInstance.post(
              `/course/getByName/${searchTerm}`
            );
            setCourses(response.data);
          } catch (error) {
            setCourses([]);
          }
        } else {
          const res = await axiosInstance.get("/course/get");
          setCourses(res.data);
        }
      };

      fetchByName();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newCourse, duration: Number(newCourse.duration) };
      const response = await axiosInstance.post("/course/add", payload);
      setCourses((prev) => [...prev, response.data]);
      setShowPopup(false);
      setNewCourse({ name: "", code: "", duration: "", description: "" });

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Course added successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add course!",
      });
    }
  };

  const handleDeleteCourse = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosInstance.post(`/course/delete/${id}`);
        setCourses((prev) => prev.filter((course) => course.id !== id));
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Course has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete course!",
        });
      }
    }
  };

  const handleGoToDepartments = (courseId) => {
    navigate(`/departments/${courseId}`);
  };

  const openAddPopup = () => {
    setIsEditing(false);
    setNewCourse({ name: "", code: "", duration: "", description: "" });
    setShowPopup(true);
  };

  const openEditPopup = (course) => {
    setIsEditing(true);
    setCurrentCourseId(course.id);
    setNewCourse({
      name: course.name,
      code: course.code,
      duration: course.duration,
      description: course.description,
    });
    setShowPopup(true);
  };

  const handleAddOrUpdateCourse = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...newCourse, duration: Number(newCourse.duration) };

      if (isEditing) {
        const response = await axiosInstance.put(
          `/course/update/${currentCourseId}`,
          payload
        );
        setCourses((prev) =>
          prev.map((c) => (c.id === currentCourseId ? response.data : c))
        );
        Swal.fire({
          icon: "success",
          title: "Updated",
          text: "Course updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        const response = await axiosInstance.post("/course/add", payload);
        setCourses((prev) => [...prev, response.data]);
        Swal.fire({
          icon: "success",
          title: "Added",
          text: "Course added successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      }

      setShowPopup(false);
      setNewCourse({ name: "", code: "", duration: "", description: "" });
      setCurrentCourseId(null);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: isEditing ? "Failed to update course!" : "Failed to add course!",
      });
    }
  };

  return (
    <div className="courses-container">
      <h1 className="courses-title">Available Courses</h1>

      <input
        type="text"
        className="search-input"
        placeholder="Search by course name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button className="add-button" onClick={openAddPopup}>
        Add Course
      </button>

      {loading ? (
        <p className="loading">Loading courses...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : courses.length === 0 ? (
        <p className="no-courses">No courses found</p>
      ) : (
        <div className="table-container">
          <table className="courses-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Name</th>
                <th>Code</th>
                <th>Duration</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.name}</td>
                  <td>{course.code}</td>
                  <td>{course.duration}</td>
                  <td>{course.description}</td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => openEditPopup(course)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="view-button"
                      onClick={() => handleGoToDepartments(course.id)}
                    >
                      Go to Course
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>{isEditing ? "Update Course" : "Add New Course"}</h2>
            <form onSubmit={handleAddOrUpdateCourse}>
              <input
                type="text"
                placeholder="Name"
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Code"
                value={newCourse.code}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, code: e.target.value })
                }
                required
              />
              <input
                type="number"
                placeholder="Duration (in years)"
                value={newCourse.duration}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, duration: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Description"
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({
                    ...newCourse,
                    description: e.target.value,
                  })
                }
                required
              />
              <div className="button-group">
                <button type="submit" className="save-button">
                  {isEditing ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
