import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import VisualMap1 from "./VisualMap1";

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f7f9fc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  transition: box-shadow 0.3s ease-in-out;

  h2 {
    margin-bottom: 15px;
    font-size: 1.5rem;
    color: #555;
    font-weight: 600;
  }

  &:hover {
    box-shadow: 30px 30px 42px rgba(0, 0, 0, 0.15);
  }
`;

const VisualMap = ({ userEmail }) => {
  const [studentView, setStudentView] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = "https://server-u9ga.onrender.com/Student";

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(API_URL);
        const students = response.data;

        const currentUser = students.find(
          (student) => student.email === userEmail
        );

        if (currentUser) {
          setStudentView({
            id: currentUser.id,
            name: currentUser.name,
            seat: currentUser.seat_number || "Seat not assigned",
            time: currentUser.time || "Time not assigned",
            achievements: currentUser.achievements || [],
            feedback: currentUser.feedback || "",
          });
        } else {
          setError("User data not found. Please check your login details.");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
        setError("Failed to fetch user data. Please try again later.");
      }
    };

    if (userEmail) {
      fetchStudentData();
    } else {
      setError("No email provided. Please log in first.");
    }
  }, [userEmail]);

  if (error) return <div className="error-message">{error}</div>;
  if (!studentView) return <div>Loading...</div>;

  return (
    <AppContainer>
      <h1>Seat Details</h1>

      <Section>
        <h2>Your Seat: {studentView.seat} </h2>
      </Section>

      
        <h2>Seating Layout</h2>
        
        <VisualMap1 highlightedSeat={studentView.seat} />
    
    </AppContainer>
  );
};

export default VisualMap;
