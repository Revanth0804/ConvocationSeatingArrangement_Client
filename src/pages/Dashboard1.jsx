import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
  padding: 20px;
  background-color: #f7f9fc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.3s ease-in-out;
`;

const Section = styled.div`
  margin: 20px 0;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin-bottom: 15px;
    font-size: 1.6rem;
    color: #444;
    transition: color 0.2s ease;
  }

  p {
    font-size: 1.1rem;
    color: #333;
  }

  button {
    padding: 12px 25px;
    background-color: #1a202c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: #0056b3;
      transform: scale(1.05);
    }
  }

  textarea,
  input {
    width: 100%;
    margin: 10px 0;
    padding: 14px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
      border-color: #007bff;
      box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    }
  }
`;

const WeatherWidget = styled.div`
  text-align: center;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #e6f7ff;
  margin-top: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  p {
    font-size: 1.2rem;
    color: #007bff;
  }

  strong {
    font-weight: 700;
  }
`;

const SuccessMessage = styled.span`
  display: block;
  margin-top: 15px;
  color: green;
  font-weight: 600;
  font-size: 1.1rem;
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const Dashboard1 = ({ userEmail }) => {
  const [studentView, setStudentView] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [weather, setWeather] = useState({ temp: '27°C', condition: 'Sunny' });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const API_URL = 'https://server-u9ga.onrender.com/Student';

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
            seat: currentUser.seat_number || 'Seat not assigned',
            time: currentUser.time || 'Time not assigned',
            achievements: currentUser.achievements || [],
            feedback: currentUser.feedback || '',
          });
        } else {
          setError('User data not found. Please check your login details.');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Failed to fetch user data. Please try again later.');
      }
    };

    if (userEmail) {
      fetchStudentData();
    } else {
      setError('No email provided. Please log in first.');
    }
  }, [userEmail]);

  const handleFeedbackSubmit = async () => {
    if (!studentView || !studentView.id) {
      setSuccessMessage('Error: Cannot submit feedback. Student not found.');
      return;
    }

    if (!feedback.trim()) {
      setSuccessMessage('Feedback cannot be empty.');
      return;
    }

    try {
      await axios.patch(`${API_URL}/${studentView.id}`, {
        feedback: feedback,
      });

      setSuccessMessage('Thank you for your feedback!');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSuccessMessage('Failed to submit feedback. Please try again later.');
    }
  };

  if (error) return <div>{error}</div>;
  if (!studentView) return <div>Loading...</div>;

  return (
    <AppContainer>
      <h1>Student Dashboard</h1>

      <Section>
        <h2>Personalized View</h2>
        <p><strong>Name:</strong> {studentView.name}</p>
        <p><strong>Seat:</strong> {studentView.seat}</p>
        <p><strong>Time Slot:</strong> 10:00 AM</p>
      </Section>

      <Section>
        <h2>Weather Widget</h2>
        <WeatherWidget>
          <p><strong>Temperature:</strong> {weather.temp}</p>
          <p><strong>Condition:</strong> {weather.condition}</p>
        </WeatherWidget>
      </Section>

      <Section>
        <h2>Feedback</h2>
        <textarea
          rows="4"
          placeholder="Share your feedback here..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </Section>

      <Section>
        <h2>Help Desk</h2>
        <p>Email: <a href="mailto:support@convocation.com">support@convocation.com</a></p>
        <p>Phone: <a href="tel:+1234567890">+123 456 7890</a></p>
      </Section>
    </AppContainer>
  );
};

export default Dashboard1;
