import React, { useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all courses
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/course/get"); // GET request to /course/get
        setCourses(response.data); // Set courses data
      } catch (error) {
        console.error("Error fetching courses:", error);
        if (error.response && error.response.data) {
          setError(error.response.data.message); // API error
        } else {
          setError("Server not reachable or internal error"); // Network/other error
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p>Loading courses...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (courses.length === 0) {
    return <p>No courses found</p>;
  }

  return (
    <div>
      <h1>Available Courses</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Course ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Duration</th>
            <th>Description</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Courses;
