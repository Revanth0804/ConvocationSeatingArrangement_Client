import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

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
  10%, 90% { transform: translateX(-1px); }
  20%, 80% { transform: translateX(2px); }
  30%, 50%, 70% { transform: translateX(-4px); }
  40%, 60% { transform: translateX(4px); }
`;

// Styled Components
const Background = styled.div`
  background: linear-gradient(135deg, #507687, rgb(204, 131, 143));
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;


const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #fcfaee;
  margin-bottom: 20px;
  animation: ${fadeIn} 1.2s ease-out;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
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
const SignUpForm = ({ setIsLogin, users = [], setUsers }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const form = document.getElementById("formContainer");
      if (form) form.classList.add("show");
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const togglePasswordVisibility = (isConfirm = false) => {
    isConfirm
      ? setShowConfirmPassword((prev) => !prev)
      : setShowPassword((prev) => !prev);
  };

  const API_URL_USERS = "https://server-u9ga.onrender.com/Users";
  const API_URL_STUDENTS = "https://server-u9ga.onrender.com/Student";

  const addUser = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!newUser.name) errors.name = "Name is required.";
    if (!newUser.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(newUser.email)) errors.email = "Enter a valid email.";
    if (!newUser.password) errors.password = "Password is required.";
    if (!newUser.confirmPassword) errors.confirmPassword = "Confirm Password is required.";
    else if (newUser.password !== newUser.confirmPassword)
      errors.confirmPassword = "Passwords do not match.";

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      const studentResponse = await axios.get(API_URL_STUDENTS);
      const studentList = Array.isArray(studentResponse.data) ? studentResponse.data : [];
      const matchingStudent = studentList.find(
        (student) => student.email === newUser.email
      );

      if (!matchingStudent) {
        setErrorMessage("Student email ID does not match.");
        setSuccessMessage("");
        return;
      }

      const userResponse = await axios.get(API_URL_USERS);
      const usersList = Array.isArray(userResponse.data) ? userResponse.data : [];
      const existingUser = usersList.find((user) => user.email === newUser.email);

      if (existingUser) {
        setErrorMessage("Email already exists.");
        setSuccessMessage("");
        return;
      }

      const newUserResponse = await axios.post(API_URL_USERS, {
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
      });

      if (newUserResponse.status === 201) {
        setUsers([...(users || []), newUserResponse.data]);
        setSuccessMessage("Signup successful. Please log in.");
        setNewUser({ name: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => setIsLogin(true), 2000);
        setErrorMessage("");
      } else {
        setSuccessMessage("Unexpected response received.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSuccessMessage("Signup successful. Please log in.");
    }
  };

  return (
    <Background>
      
        <Title>Student SignUp Form</Title>
    

      <FormContainer id="formContainer" onSubmit={addUser}>
        <FormGroup>
          <Input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className={validationErrors.name ? "error" : ""}
          />
          {validationErrors.name && <ErrorMessage>{validationErrors.name}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Input
            type="email"
            placeholder="Enter your Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className={validationErrors.email ? "error" : ""}
          />
          {validationErrors.email && <ErrorMessage>{validationErrors.email}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <PasswordWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your Password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              className={validationErrors.password ? "error" : ""}
            />
            <TogglePasswordIcon onClick={() => togglePasswordVisibility(false)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePasswordIcon>
          </PasswordWrapper>
          {validationErrors.password && <ErrorMessage>{validationErrors.password}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <PasswordWrapper>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your Password"
              value={newUser.confirmPassword}
              onChange={(e) =>
                setNewUser({ ...newUser, confirmPassword: e.target.value })
              }
              className={validationErrors.confirmPassword ? "error" : ""}
            />
            <TogglePasswordIcon onClick={() => togglePasswordVisibility(true)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </TogglePasswordIcon>
          </PasswordWrapper>
          {validationErrors.confirmPassword && (
            <ErrorMessage>{validationErrors.confirmPassword}</ErrorMessage>
          )}
        </FormGroup>

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Button type="submit">Sign Up</Button>

        <LinkText>
          Already have an account? <Link to="/login">Login</Link>
        </LinkText>
      </FormContainer>
    </Background>
  );
};

export default SignUpForm;
