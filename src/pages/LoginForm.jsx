import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Animations
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const shake = keyframes`
  10%, 90% {
    transform: translateX(-1px);
  }
  20%, 80% {
    transform: translateX(2px);
  }
  30%, 50%, 70% {
    transform: translateX(-4px);
  }
  40%, 60% {
    transform: translateX(4px);
  }
`;

// Styled Components
const Background = styled.div`
  background: linear-gradient(135deg, #507687, rgb(204, 131, 143));
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #fcfaee;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease-out;
  text-align: center;
`;

const FormContainer = styled.form`
  background-color: #ffffff;
  max-width: 500px;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.8s ease-out;
  position: relative;
  z-index: 2;

  &:hover {
    transform: scale(1.02);
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #b8001f;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #507687;
    box-shadow: 0 0 10px rgba(80, 118, 135, 0.5);
    outline: none;
  }

  &.error {
    animation: ${shake} 0.5s ease;
    border-color: red;
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const TogglePasswordIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  font-size: 1.2rem;
  color: #507687;
  cursor: pointer;

  &:hover {
    color: #b8001f;
    transform: translateY(-50%) scale(1.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(135deg, #507687, rgb(204, 131, 143));
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #507687, #b8001f);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.p`
  color: green;
  font-weight: bold;
  font-size: 0.9rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const LinkText = styled.p`
  text-align: center;
  margin-top: 1rem;
  font-size: 0.9rem;

  a {
    color: #b8001f;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      color: #507687;
      text-decoration: underline;
    }
  }
`;

// Component
const LoginForm = ({ setLoggedInUser }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      const form = document.getElementById("formContainer");
      if (form) form.classList.add("show");
    }, 200);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get("https://server-u9ga.onrender.com/Users");
      const users = response.data;

      const user = users.find(
        (u) =>
          u.email === loginData.email &&
          u.password === loginData.password
      );

      if (user) {
        setSuccessMessage("Login successful! Redirecting...");
        setErrorMessage("");

        localStorage.setItem("userEmail", user.email);
        setLoggedInUser(user.email);

        setTimeout(() => {
          navigate("/loginhome");
        }, 2000);
      } else {
        setErrorMessage("Invalid email or password.");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Login failed. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <Background>
      <Title>Student Login</Title>
      <FormContainer id="formContainer" onSubmit={handleLogin}>
        <FormGroup>
          <Input
            type="email"
            placeholder="Enter your Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <PasswordWrapper>
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your Password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <TogglePasswordIcon onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </TogglePasswordIcon>
          </PasswordWrapper>
        </FormGroup>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        <Button type="submit">Login</Button>
        <LinkText>
          Don't have an account? <Link to="/Signup">Signup</Link>
        </LinkText>
      </FormContainer>
    </Background>
  );
};

export default LoginForm;
