import React from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosInstance"; // Make sure the path is correct
import "./ChoosePlan.css";

export default function ChoosePlan() {
  const navigate = useNavigate();

  const handleTrial = async () => {
    try {
      const email = sessionStorage.getItem("email");
      if (!email) {
        alert("Error Occured Please try again.");
        return;
      }

      const currentDate = new Date();
      const endDate = new Date();
      endDate.setDate(currentDate.getDate() + 8);

      const updatePayload = {
        startDate: currentDate.toISOString(),
        endDate: endDate.toISOString(),
        status: "Active",
      };

      const response = await axiosInstance.put(
        `/institutions/update?email=${email}`,
        updatePayload
      );

      if (response.status === 200) {
        alert("8-day trial activated!");
        sessionStorage.removeItem("email"); // Clear session if needed
        navigate("/login");
      } else {
        alert("Failed to activate trial. Please try again.");
      }
    } catch (error) {
      console.error("Error activating trial:", error);
      alert("An error occurred while activating the trial.");
    }
  };

  const handlePremium = () => {
    alert("Redirecting to payment gateway for Premium Plan (₹10,000/month).");
    // navigate("/payment");
  };

  return (
    <div className="choose-plan-container">
      <h2>Choose Your Plan</h2>
      <div className="plan-options">
        <div className="plan-card">
          <h3>8-Day Free Trial</h3>
          <p>Try all features for free for 8 days.</p>
          <button onClick={handleTrial}>Start Free Trial</button>
        </div>

        <div className="plan-card">
          <h3>Premium Plan</h3>
          <p>₹10,000/month — Full access to all premium features.</p>
          <button onClick={handlePremium}>Upgrade to Premium</button>
        </div>
      </div>
    </div>
  );
}
