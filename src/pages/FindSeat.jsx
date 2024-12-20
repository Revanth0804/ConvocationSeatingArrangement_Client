import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Main = styled.main`
  padding: 20px;
`;

const Section = styled.section`
  background: #e8f2f9;
  padding: 15px;
  border-radius: 8px;
  background-image: url("./images/fSeat.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  color: #d4f1f4;
  height: 73.5vh;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: bolder;
  font-style: italic;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
`;

const Form = styled.form`
  margin-left: 2%;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ebe1e1;
  border-radius: 5px;
  width: 250px;
`;

const Button = styled.button`
  padding: 10px;
  margin: 5px;
  border: 1px solid #ebe1e1;
  border-radius: 5px;
  background-color: #05445e;
  color: white;
  width: 120px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #189ab4;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const SeatDetails = styled.div`
  margin-left: 2%;
  p {
    font-weight: bold;
  }
`;


function FindSeat() {
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [seatDetails, setSeatDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [students, setStudents] = useState([]);

  const api_url = "https://server-u9ga.onrender.com/Student";

  useEffect(() => {
    axios
      .get(api_url)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
        setErrorMessage("Failed to load student data. Please try again later.");
      });
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();

    const student = students.find(
      (student) => student.registration_number === registrationNumber
    );

    if (student) {
      setSeatDetails({
        department: student.department,
        seat_number: student.seat_number,
      });
      setErrorMessage("");
    } else {
      setSeatDetails(null);
      setErrorMessage("Student not found. Please check the registration number.");
    }
  };

  return (
    <Main>
      <Section id="student-search">
        <Title>Find Your Seat</Title>
        <Form id="search-form" onSubmit={handleSearch}>
          <Label htmlFor="regNumber">Registration Number:</Label>
          <Input
            type="text"
            id="regNumber"
            placeholder="Enter registration number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
          />
          <Button type="submit">
            <i className="fa-solid fa-magnifying-glass fa-beat-fade"></i> Search
          </Button>
        </Form>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        {seatDetails && (
          <SeatDetails>
            <p>
              <strong>Department:</strong> {seatDetails.department}
            </p>
            <p>
              <strong>Seat Number:</strong> {seatDetails.seat_number}
            </p>
          </SeatDetails>
        )}
      </Section>
    </Main>
  );
}

export default FindSeat;
