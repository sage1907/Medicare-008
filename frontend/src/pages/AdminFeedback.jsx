import React, { useState, useEffect } from "react";
import { BASE_URL, token } from "../config";
import { Link } from "react-router-dom";
import Loader from "../components/Loader/Loading";
import Error from "../components/Error/Error";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/feedback`, {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setError("Failed to load feedbacks. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (isLoading) return <div className="text-center py-10"><Loader /></div>;
  if (error) return <div className="text-center py-10 text-red-500"><Error errorMessage={error} /></div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Feedback Dashboard</h1>
      {feedbacks.length === 0 ? (
        <p>No feedbacks available.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{feedback.subject}</h2>
              <p className="text-gray-600 mb-4">{feedback.message}</p>
              <p className="text-sm text-gray-500">From: {feedback.email}</p>
              <p className="text-sm text-gray-500">
                Submitted on: {new Date(feedback.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default AdminFeedback;