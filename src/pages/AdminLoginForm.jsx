import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  text-align: center;
  margin-top: 10px;
  font-size: 40px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const FormContainer = styled.form`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #507687;
  border-radius: 8px;
  background-color: #fcfaee;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  min-height: 69vh;
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;


const FormGroup = styled.div`
  margin-top: 5%;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #b8001f;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #507687;
    outline: none;
    box-shadow: 0 0 8px rgba(80, 118, 135, 0.8);
  }
`;


const Button = styled.button`
  width: 100%;
  padding: 0.5rem;
  background-color: #b8001f;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #fcfaee;
    color: #b8001f;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;


const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 1rem;

  a {
    color: #507687;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const AdminLoginForm = ({ setLoggedInAdmin }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const API_URL = "https://server-u9ga.onrender.com/Admin";

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!loginData.email || !loginData.password) {
      setErrorMessage("Please fill in both email and password.");
      return;
    }

    try {
      const response = await axios.get(API_URL);
      const admins = response.data;

      const admin = admins.find(
        (a) => a.mail === loginData.email && a.password === loginData.password
      );

      if (admin) {
        setSuccessMessage("Login successful! Redirecting...");
        setLoggedInAdmin(admin.mail);
        setTimeout(() => navigate("/admindashboard"), 2000);
      } else {
        setErrorMessage("Invalid email or password.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Unable to connect to the server. Please try again later.");
    }
  };

  return (
    <>
      <Title>Admin Login</Title>
      <FormContainer onSubmit={handleLogin}>
        <FormGroup>
          <Input
            type="email"
            placeholder="Enter your Email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            placeholder="Enter your Password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          />
        </FormGroup>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        <Button type="submit">Login</Button>
        <LinkText>
          Not an admin?{" "}
          <Link to="/login">
            Go to Student Login
          </Link>
        </LinkText>
      </FormContainer>
    </>
  );
};

export default AdminLoginForm;
