import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";
import Swal from "sweetalert2";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    duration: "",
    description: "",
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/course/get");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
        if (error.response && error.response.data) {
          setError(error.response.data.message);
        } else {
          setError("Server not reachable or internal error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...newCourse,
        duration: Number(newCourse.duration),
      };
      const response = await axiosInstance.post("/course/add", payload);
      setCourses([...courses, response.data]);
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
      console.error("Error adding course:", error);
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
        setCourses(courses.filter((course) => course.id !== id));

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Course has been deleted.",
          timer: 2000,
          showConfirmButton: false,
        });
      } catch (error) {
        console.error("Error deleting course:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete course!",
        });
      }
    }
  };

  //this code is for the alert and above was for sweet alert
  // const handleAddCourse = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const payload = {
  //       ...newCourse,
  //       duration: Number(newCourse.duration),
  //     };
  //     const response = await axiosInstance.post("/course/add", payload);
  //     setCourses([...courses, response.data]);
  //     setShowPopup(false);
  //     setNewCourse({ name: "", code: "", duration: "", description: "" });
  //   } catch (error) {
  //     console.error("Error adding course:", error);
  //     alert("Failed to add course");
  //   }
  // };
  // const handleDeleteCourse = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this course?")) {
  //     try {
  //       await axiosInstance.post(`/course/delete/${id}`); // POST request instead of DELETE
  //       setCourses(courses.filter((course) => course.id !== id));
  //     } catch (error) {
  //       console.error("Error deleting course:", error);
  //       alert("Failed to delete course");
  //     }
  //   }
  // };

  if (loading) {
    return <p style={styles.loading}>Loading courses...</p>;
  }

  if (error) {
    return <p style={styles.error}>Error: {error}</p>;
  }

  if (courses.length === 0) {
    return <p style={styles.noCourses}>No courses found</p>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Available Courses</h1>
      <button style={styles.addButton} onClick={() => setShowPopup(true)}>
        Add Course
      </button>
      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Course ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Code</th>
              <th style={styles.th}>Duration</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} style={styles.tr}>
                <td style={styles.td}>{course.id}</td>
                <td style={styles.td}>{course.name}</td>
                <td style={styles.td}>{course.code}</td>
                <td style={styles.td}>{course.duration}</td>
                <td style={styles.td}>{course.description}</td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h2>Add New Course</h2>
            <form onSubmit={handleAddCourse}>
              <input
                style={styles.input}
                type="text"
                placeholder="Name"
                value={newCourse.name}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, name: e.target.value })
                }
                required
              />
              <input
                style={styles.input}
                type="text"
                placeholder="Code"
                value={newCourse.code}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, code: e.target.value })
                }
                required
              />
              <input
                style={styles.input}
                type="number"
                placeholder="Duration (in years)"
                value={newCourse.duration}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, duration: e.target.value })
                }
                required
              />
              <textarea
                style={styles.input}
                placeholder="Description"
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
                required
              />
              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.saveButton}>
                  Add
                </button>
                <button
                  type="button"
                  style={styles.cancelButton}
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

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2rem",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  th: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "12px",
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "12px",
    textAlign: "left",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
  },
  error: {
    textAlign: "center",
    marginTop: "50px",
    color: "red",
    fontSize: "18px",
  },
  noCourses: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
  },
  addButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    marginBottom: "10px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  },
  deleteButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "14px",
  },
  popupOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 0 15px rgba(0,0,0,0.3)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    color: "black",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  },
};

export default Courses;
