import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";



const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1050;
  background-color: #05445e;
  color: white;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #05445e;
`;

const Logo = styled.img`
  height: 50px;
  margin-left: 2%;
`;

const Title = styled.a`
  margin-left: 1%;
  color: white;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
`;

const NavbarCollapse = styled.div`
  display: flex;
  align-items: center;
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: auto;
`;

const NavItem = styled.li`
  margin: 0 10px;
`;

const NavButton = styled.button`
  background-color: red;
  width: 150px;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top:10%;

  &:hover {
    background-color: #ff6b6b;
  }
`;

const StyledParagraph = styled.p`
  font-size: 18px;
  margin: 14px;
  font-weight: bold;
`;

const NavbarToggler = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background-color: white;
  border-radius: 5px;
  display: none; /* Hidden for larger screens */
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const NavbarTogglerIcon = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  background-color: #05445e;
  margin: 5px auto;
`;


function Header1() {
  const location = useLocation();

  const isAdminLoginPage = location.pathname === "/adminlogin";
  const isStudentLoginPage = location.pathname === "/login";
  const isLandingPage = location.pathname === "/";

  return (
    <HeaderContainer>
      <Navbar>
        <Logo src="./images/logoicon.png" alt="Logo" />
        <Title href="/">Convocation Seating Arrangement</Title>

        <NavbarToggler>
          <NavbarTogglerIcon />
          <NavbarTogglerIcon />
          <NavbarTogglerIcon />
        </NavbarToggler>

        <NavbarCollapse>
          <NavList>
            {!isLandingPage && (
              <NavItem>
                <NavLink to="/" className="nav-link">
                  <StyledParagraph>Home</StyledParagraph>
                </NavLink>
              </NavItem>
            )}
            {!isStudentLoginPage && (
              <NavItem>
                <NavLink to="/login" className="nav-link">
                  <NavButton>Student Login</NavButton>
                </NavLink>
              </NavItem>
            )}
            {!isAdminLoginPage && (
              <NavItem>
                <NavLink to="/adminlogin" className="nav-link">
                  <NavButton>Admin Login</NavButton>
                </NavLink>
              </NavItem>
            )}
          </NavList>
        </NavbarCollapse>
      </Navbar>
    </HeaderContainer>
  );
}

export default Header1;
