import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";
import "./Departments.css";

const Departments = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseRes = await axiosInstance.get(`/course/getById/${courseId}`);
        setCourseName(courseRes.data.name);

        const deptRes = await axiosInstance.get(`/department/getByCourse/${courseId}`);
        setDepartments(deptRes.data);
      } catch (err) {
        setError("Failed to load course or departments.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <div className="departments-container">
      <h2 className="departments-title">
        Departments in <span>{courseName}</span>
      </h2>

      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : departments.length === 0 ? (
        <p className="no-departments">No departments found for this course.</p>
      ) : (
        <table className="departments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>HOD</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((dept) => (
              <tr key={dept.id}>
                <td>{dept.id}</td>
                <td>{dept.name}</td>
                <td>{dept.hod || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Departments;
