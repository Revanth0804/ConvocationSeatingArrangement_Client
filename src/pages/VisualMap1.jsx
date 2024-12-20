import React from "react";
import { PiArmchairDuotone } from "react-icons/pi";
import styled, { keyframes, css } from "styled-components";


const blink = keyframes`
  50% {
    opacity: 0.5;
    background-color: green;
    border: 1px solid black;
  }
`;

const SeatingLayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  gap: 5px;

  & > button:nth-child(7n) {
    margin-right: 90px; 
  }
`;

const Seat = styled.button`
  background-color: ${({ isRed }) => (isRed ? "blue" : "#f0f0f0")};
  border: 1px solid  #ccc;
  border-radius: 5px;
  font-size:25px;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${({ isRed }) => (isRed ? "white" : "black")};
  animation: ${({ isHighlighted }) =>
    isHighlighted ? css`${blink} 1s infinite` : "none"};

  &:hover {
    background-color:#d1e7ff;
    border-color: #007bff;
  }
`;

const SeatLabel = styled.span`
  font-size: 12px;
  margin-bottom: 5px;
`;

const ScreenImage = styled.img`
  width: 70%;
  margin-top: 20px;
`;

const VisualMap1 = ({ highlightedSeat }) => {
  const rowLabels = "ABCDEFGHIJK";

  const rows = Array.from({ length: 11 }, (_, rowIndex) => (
    <Row key={rowIndex}>
      {Array.from({ length: 20 }, (_, seatIndex) => {
        const seat_number = `${rowLabels[rowIndex]}${seatIndex + 1}`;
        const isHighlighted = seat_number === highlightedSeat;
        const isRed = rowLabels[rowIndex] === "K"; 

        return (
          <Seat key={seat_number} isHighlighted={isHighlighted} isRed={isRed}>
            <SeatLabel>{seat_number}</SeatLabel>
            <PiArmchairDuotone id="chair" />
          </Seat>
        );
      })}
    </Row>
  ));

  return (
    <SeatingLayoutContainer>
      {rows}
      <ScreenImage src="../src/assets/images/screen.png" alt="Screen" />
    </SeatingLayoutContainer>
  );
};

export default VisualMap1;
