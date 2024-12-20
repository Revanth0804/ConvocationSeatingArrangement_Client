import React, { useState } from "react";
import axios from "axios";
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

  const API_URL_USERS = "https://server-u9ga.onrender.com/Users";
  const API_URL_STUDENTS = "https://server-u9ga.onrender.com/Student";

  const addUser = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!newUser.name) errors.name = "Name is required.";
    if (!newUser.email) errors.email = "Email is required.";
    else if (!/\S+@\S+/.test(newUser.email)) errors.email = "Enter a valid email.";
    if (!newUser.password) errors.password = "Password is required.";
    else if (newUser.password.length < 3) errors.password = "Password must be at least 3 characters long.";
    if (!newUser.confirmPassword) errors.confirmPassword = "Confirm Password is required.";
    else if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = "Passwords do not match.";

    setValidationErrors(errors);
    if (Object.keys(errors).length > 0) return;

    try {
      console.log("Users state before adding:", users);

      const studentResponse = await axios.get(API_URL_STUDENTS);
      const studentList = Array.isArray(studentResponse.data) ? studentResponse.data : [];
      const matchingStudent = studentList.find((student) => student.email === newUser.email);

      if (!matchingStudent) {
        setErrorMessage("Student email ID does not match. Please use a registered student email.");
        setSuccessMessage("");
        return;
      }


      const userResponse = await axios.get(API_URL_USERS);
      const usersList = Array.isArray(userResponse.data) ? userResponse.data : [];
      const existingUser = usersList.find((user) => user.email === newUser.email);

      if (existingUser) {
        setErrorMessage("Email already exists. Please use a different email.");
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
        setNewUser({ name: "", email: "", password: "", confirmPassword: "" });
        setValidationErrors({});
        setSuccessMessage("Signup successful. Please log in.");
        setTimeout(() => {
          setIsLogin(true);
        }, 2000);
        setErrorMessage("");
      } else {
        setSuccessMessage("Unexpected response received.");
        // setSuccessMessage("");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSuccessMessage("Signup successful. Please login as student");
      setErrorMessage("");
    }
  };

  return (
    <>
      <Title>Student SignUp Form</Title>
      <FormContainer onSubmit={addUser}>
        <FormGroup>
          <Input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          {validationErrors.name && <ErrorMessage>{validationErrors.name}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Input
            type="email"
            placeholder="Enter your Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          {validationErrors.email && <ErrorMessage>{validationErrors.email}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            placeholder="Enter your Password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          />
          {validationErrors.password && <ErrorMessage>{validationErrors.password}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            placeholder="Confirm your Password"
            value={newUser.confirmPassword}
            onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
          />
          {validationErrors.confirmPassword && <ErrorMessage>{validationErrors.confirmPassword}</ErrorMessage>}
        </FormGroup>

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Button type="submit">Sign Up</Button>
      </FormContainer>
    </>
  );
};

export default SignUpForm;