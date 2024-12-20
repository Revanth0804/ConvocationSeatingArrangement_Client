import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const HomeContainer = styled.div`
  background-image: url("./src/assets/images/Home.jpg");
  height: 80.6vh;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchButton = styled.button`
  width:100%;
  padding: 10px 20px;
  font-weight: bold;
  background-color: #05445e;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;

  &:hover {
    background-color: #189ab4;
  }
`;

function Home() {
  return (
    <HomeContainer>
      <Link to="/findseat">
        <SearchButton>Find Seat</SearchButton>
      </Link>
    </HomeContainer>
  );
}

export default Home;
