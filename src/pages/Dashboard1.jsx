import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f7f9fc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 20px;

  h1 {
    font-size: 2.5rem;
    color: #333;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }
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

  p {
    font-size: 1.1rem;
    color: #333;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s, transform 0.2s ease;

    &:hover {
      background-color: #0056b3;
      transform: scale(1.05);
    }
  }

  input,
  textarea {
    width: 100%;
    margin: 10px 0;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #007bff;
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
  font-size: 1rem;
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

  if (error) return <div className="error-message">{error}</div>;
  if (!studentView) return <div>Loading...</div>;

  return (
    <AppContainer>
      
        <h1>Student Dashboard</h1>
      

      <Section>
        <h2>Personalized View</h2>
        <p>
          <strong>Name:</strong> {studentView.name}
        </p>
        <p>
          <strong>Seat:</strong> {studentView.seat}
        </p>
        <p>
          <strong>Time Slot:</strong>10:00 AM
        </p>
      </Section>

      <Section>
        <h2>Weather Widget</h2>
        <WeatherWidget>
          <p>
            <strong>Temperature:</strong> {weather.temp}
          </p>
          <p>
            <strong>Condition:</strong> {weather.condition}
          </p>
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
        <p>For assistance, contact us at:</p>
        <p>Email: support@convocation.com</p>
        <p>Phone: +123 456 7890</p>
      </Section>
    </AppContainer>
  );
};

export default Dashboard1;
