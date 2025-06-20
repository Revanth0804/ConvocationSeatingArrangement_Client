import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
const Section = styled.section`
  background: #e8f2f9;
  padding: 15px;
  border-radius: 8px;
  background-image: url("./images/fSeat.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #d4f1f4;

  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
`;

const ProfileContainer = styled.div`
  max-width: 500px;
  margin: 2% auto;
  padding: 30px;
  background: linear-gradient(-45deg, #ff9a9e, #fad0c4, #fbc2eb, #a1c4fd);
  background-size: 400% 400%;
  border-radius: 12px;
  box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  text-align: center;
  animation: gradientShift 6s ease infinite, fadeInSlideUp 1s ease-out;
  border: 2px solid transparent;
  transition: all 0.3s ease;

  min-height: 200px;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.2);
  }

  @keyframes fadeInSlideUp {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
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
  font-size: 30px;
  margin-bottom: 25px;
  color: #333;
`;

const Label = styled.label`
  display: block;
  margin: 12px 0 8px;
  font-weight: bold;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 18px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 12px 18px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: ${(props) => (props.cancel ? "#f44336" : "#4caf50")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.cancel ? "#d32f2f" : "#45a049"};
  }
`;

const Info = styled.div`
  text-align: left;
  margin-top: 15px;
`;

const Paragraph = styled.p`
  margin: 8px 0;
  font-size: 18px;
  color: #555;
`;

const NonEditableSpan = styled.span`
  font-size: 16px;
  color: #888;
`;

const SuccessMessage = styled.div`
  color: #4caf50;
  font-weight: bold;
  margin-bottom: 18px;
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-weight: bold;
  margin-bottom: 18px;
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
            profilePicture: currentUser.profilePicture || "https://via.placeholder.com/100",
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
    <Section>
      <ProfileContainer>
        <Heading>My Profile</Heading>
        <ProfileImage
          src={formData?.profilePicture || "https://via.placeholder.com/100"}
          alt="Profile"
        />
        <Info>
          {isEditing ? (
            <>
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
            </>
          ) : (
            <>
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
              <Button cancel onClick={deleteProfilePic}>Delete Profile Picture</Button>
            </>
          )}
        </Info>
        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
      </ProfileContainer>
    </Section>
  );
};

export default UserProfile;
