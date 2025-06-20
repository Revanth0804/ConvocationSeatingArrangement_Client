import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// === Animations ===
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

// === Styled Components ===
const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1050;
  background-color: #1a202c;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Logo = styled.img`
  height: 50px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.a`
  margin-left: 1%;
  color: #edf2f7;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #63b3ed;
  }
`;

const NavbarCollapse = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-left: auto;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    width: 100%;
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    background-color: #1a202c;
    animation: ${slideIn} 0.3s ease-out;
    padding: 20px 0;
    text-align: center;
  }
`;

const NavItem = styled.li`
  margin: 0 15px;

  @media (max-width: 768px) {
    margin: 15px 0;
  }
`;

const NavButton = styled.button`
  background-color: #38b2ac;
  color: #edf2f7;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  padding: 10px 20px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #319795;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(50, 150, 150, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;

const StyledParagraph = styled.p`
  font-size: 18px;
  margin: 14px;
  font-weight: bold;
  color: #edf2f7;

  &:hover {
    color: #e53e3e;
  }
`;

const NavbarToggler = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background-color: #38b2ac;
  border-radius: 5px;
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }

  &:focus {
    outline: none;
  }
`;

const NavbarTogglerIcon = styled.span`
  display: block;
  width: 25px;
  height: 3px;
  background-color: #edf2f7;
  margin: 5px auto;
  border-radius: 3px;
  transition: transform 0.3s ease;

  &:nth-child(1) {
    transform: ${({ isOpen }) => (isOpen ? "rotate(45deg) translate(5px, 5px)" : "none")};
  }

  &:nth-child(2) {
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
  }

  &:nth-child(3) {
    transform: ${({ isOpen }) => (isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none")};
  }
`;


// === Main Component ===
function Header1() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdminLoginPage = location.pathname === "/adminlogin";
  const isStudentLoginPage = location.pathname === "/login";
  const isLandingPage = location.pathname === "/";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <HeaderContainer>
      <Navbar>
        <Logo src="./images/logoicon.png" alt="Logo" />
        <Title href="/">Convocation Seating Hub</Title>

        <NavbarToggler onClick={toggleMenu}>
          <NavbarTogglerIcon isOpen={isMenuOpen} />
          <NavbarTogglerIcon isOpen={isMenuOpen} />
          <NavbarTogglerIcon isOpen={isMenuOpen} />
        </NavbarToggler>

        <NavbarCollapse>
          <NavList isOpen={isMenuOpen}>
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
