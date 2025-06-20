import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  background-color: #05445e;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: ${fadeIn} 0.5s ease-out;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: #1a202c;
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.img`
  height: 50px;
  margin-left: 2%;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const Title = styled.a`
  margin-left: 1%;
  color: white;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande", "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: #80ced7;
  }
`;

const NavbarToggler = styled.button`
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: auto;

  &:focus {
    outline: none;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const NavbarTogglerIcon = styled.div`
  width: 100%;
  height: 4px;
  background-color: #ffffff;
  border-radius: 2px;
  transition: all 0.3s linear;

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

const NavList = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-left: auto;
  animation: ${slideIn} 0.3s ease-out;

  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? "block" : "none")};
    width: 100%;
    text-align: center;
    margin-top: 0px;
    background-color: #05445e;
    padding: 20px 0;
  }
`;

const NavItem = styled.li`
  margin-left: 0;

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const MenuItem = styled(NavLink)`
  color: white;
  font-size: 1rem;
  padding: 15px;
  text-align: left;
  display: block;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #80ced7;
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
  background-color: #38b2ac;
  width: 100px;
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

// === Component ===
const Header = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    closeMenu();
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Navbar>
        <Logo src="./images/logoicon.png" alt="Logo" />
        <Title href="/">Convocation Seating Hub</Title>

        <NavbarToggler onClick={toggleMenu} aria-expanded={menuOpen}>
          <NavbarTogglerIcon isOpen={menuOpen} />
          <NavbarTogglerIcon isOpen={menuOpen} />
          <NavbarTogglerIcon isOpen={menuOpen} />
        </NavbarToggler>

        <NavList isOpen={menuOpen}>
          <NavItem>
            <MenuItem to="/" activeClassName="active" onClick={closeMenu}>
              Home
            </MenuItem>
          </NavItem>
          <NavItem>
            <MenuItem to="/Dashboard1" activeClassName="active" onClick={closeMenu}>
              Dashboard
            </MenuItem>
          </NavItem>
          <NavItem>
            <MenuItem to="/findseat" activeClassName="active" onClick={closeMenu}>
              Find Seat
            </MenuItem>
          </NavItem>
          <NavItem>
            <MenuItem to="/visualmap" activeClassName="active" onClick={closeMenu}>
              Event Space Overview
            </MenuItem>
          </NavItem>
          <NavItem>
            <MenuItem to="/profile" activeClassName="active" onClick={closeMenu}>
              Profile
            </MenuItem>
          </NavItem>
          <NavItem>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </NavItem>
        </NavList>
      </Navbar>
    </HeaderContainer>
  );
};

export default Header;
