import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const ProfileContainer = styled.div`
  max-width: 400px;
  margin: 1.5% auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  text-align: center;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
  border: 4px solid #4caf50;
`;

const Heading = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 15px;
  font-size: 14px;
  font-weight: bold;
  color: #fff;
  background-color: ${(props) => (props.cancel ? "#f44336" : "#4caf50")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.cancel ? "#d32f2f" : "#45a049"};
  }
`;

const Info = styled.div`
  text-align: left;
  margin-top: 10px;
`;

const Paragraph = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #555;
`;

const SuccessMessage = styled.div`
  color: #4caf50;
  font-weight: bold;
  margin-bottom: 15px;
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-weight: bold;
  margin-bottom: 15px;
`;

const NonEditableSpan = styled.span`
  font-size: 14px;
  color: #888;
`;

const UserProfile = ({ userEmail }) => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const API_URL = "https://server-u9ga.onrender.com/Student";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(API_URL);
        const students = response.data;
        const currentUser = students.find(
          (student) => student.email === userEmail
        );

        if (currentUser) {
          setUser(currentUser);
          setFormData({
            ...currentUser,
            profilePicture: currentUser.profilePicture || "https://via.placeholder.com/100", // Default image if none exists
          });
        } else {
          setError("User data not found. Please check your login details.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again later.");
      }
    };

    if (userEmail) {
      fetchUserData();
    } else {
      setError("No email provided. Please log in first.");
    }
  }, [userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData({ ...formData, profilePicture: imageUrl });
    }
  };

  const deleteProfilePic = async () => {
    try {
      setError(null);
      setSuccessMessage(null);

      const updatedData = { ...formData, profilePicture: "https://via.placeholder.com/100" };
      const response = await axios.put(`${API_URL}/${user.id}`, updatedData);

      if (response.status === 200) {
        setUser(updatedData);
        setFormData(updatedData);
        setSuccessMessage("Profile picture deleted successfully!");
      } else {
        setError("Failed to delete profile picture. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting profile picture:", error);
      setError("Failed to delete profile picture. Please try again later.");
    }
  };

  const saveChanges = async () => {
    try {
      setError(null);
      setSuccessMessage(null);

      const response = await axios.put(`${API_URL}/${user.id}`, formData);
      if (response.status === 200) {
        setUser(formData);
        setIsEditing(false);
        setSuccessMessage("Profile updated successfully!");
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again later.");
    }
  };

  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!user) return <div>Loading...</div>;

  return (
    <ProfileContainer>
      <Heading>My Profile</Heading>
      <ProfileImage
        src={formData?.profilePicture || "https://via.placeholder.com/100"}
        alt="Profile"
      />
      <Info>
        {isEditing ? (
          <div>
            <Label>
              Upload Profile Picture:
              <Input type="file" accept="image/*" onChange={handleImageUpload} />
            </Label>
            <Label>
              Student Name:
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Email:
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Year: <NonEditableSpan>{formData.year}</NonEditableSpan>
            </Label>
            <Label>
              Registration Number:{" "}
              <NonEditableSpan>{formData.registration_number}</NonEditableSpan>
            </Label>
            <Button onClick={saveChanges}>Save</Button>
            <Button cancel onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        ) : (
          <div>
            <Paragraph>
              <strong>Registration Number:</strong> {user.registration_number}
            </Paragraph>
            <Paragraph>
              <strong>Student Name:</strong> {user.name}
            </Paragraph>
            <Paragraph>
              <strong>Email:</strong> {user.email}
            </Paragraph>
            <Paragraph>
              <strong>Year:</strong> {user.year}
            </Paragraph>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button cancel onClick={deleteProfilePic}>
              Delete Profile Picture
            </Button>
          </div>
        )}
      </Info>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    </ProfileContainer>
  );
};

export default UserProfile;
