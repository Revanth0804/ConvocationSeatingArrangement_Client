import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// Slide-in animation for mobile menu
const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(100%);
  }
`;

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 1050;
  background-color: #1a202c;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  flex-wrap: wrap;
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
    transform: ${({ isOpen }) =>
      isOpen ? "rotate(45deg) translate(5px, 5px)" : "none"};
  }

  &:nth-child(2) {
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
  }

  &:nth-child(3) {
    transform: ${({ isOpen }) =>
      isOpen ? "rotate(-45deg) translate(5px, -5px)" : "none"};
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
    animation: ${slideIn} 0.3s ease-out;
    margin-top: 20px;
    background-color: #1a202c;
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

const NavLinkStyled = styled(NavLink)`
  color: white !important;
  font-size: 1rem;
  padding: 15px;
  text-align: left;
  display: block;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #63b3ed;
    background-color: #033649;
    border-radius: 4px;
  }

  &.active {
    color: #80ced7;
    background-color: #033649;
    border-radius: 4px;
  }
`;

const LogoutButton = styled.button`
  width: 100px;
  background-color: #38b2ac;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff6b6b;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: none;
  }
`;

const AdminHeader = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    onLogout();
    toggleMenu();
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Navbar>
        <Logo src="./images/logo1.jpeg" alt="Logo" />
        <Title href="#">Convocation Seating Hub</Title>

        <NavbarToggler onClick={toggleMenu}>
          <NavbarTogglerIcon isOpen={menuOpen} />
          <NavbarTogglerIcon isOpen={menuOpen} />
          <NavbarTogglerIcon isOpen={menuOpen} />
        </NavbarToggler>

        <NavList isOpen={menuOpen}>
          <NavItem>
            <NavLinkStyled to="/" onClick={toggleMenu}>
              Home
            </NavLinkStyled>
          </NavItem>
          <NavItem>
            <NavLinkStyled to="/admindashboard" onClick={toggleMenu}>
              Admin Dashboard
            </NavLinkStyled>
          </NavItem>
          
          <NavItem>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </NavItem>
        </NavList>
      </Navbar>
    </HeaderContainer>
  );
};

export default AdminHeader;
