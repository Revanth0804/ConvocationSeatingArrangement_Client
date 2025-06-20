import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #1a202c;
  color: #ffffff;
  padding: 40px 20px;
  text-align: center;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Section = styled.div`
  flex: 1;
  min-width: 150px;

  h4 {
    margin-bottom: 10px;
    font-size: 18px;
    font-weight: 600;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 5px 0;
      font-size: 16px;
    }

    a {
      color: #ffffff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  p {
    font-size: 16px;
    margin: 8px 0;

    a {
      color: #ffffff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const BottomBar = styled.div`
  font-size: 14px;

  a {
    color: #ffffff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;

  a {
    color: #ffffff;
    font-size: 24px;

    &:hover {
      color: #00bcd4;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Section>
          <h4>About</h4>
          <ul>
            <li><NavLink to="/company">Company</NavLink></li>
          </ul>
        </Section>

        <Section>
          <h4>Follow</h4>
          <SocialLinks>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-facebook" />
            </a>
            <a href="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-x-twitter" />
            </a>
            <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noopener noreferrer">
              <i className="fa-brands fa-instagram" />
            </a>
          </SocialLinks>
        </Section>

        <Section>
          <h4>Contact Us</h4>
          <p>Email: <a href="mailto:revanth.suvvari@gmail.com">revanth.suvvari@gmail.com</a></p>
          <p>Phone: <a href="tel:9440240880">9440240880</a></p>
        </Section>
      </FooterContent>

      <BottomBar>
        © 2024 . All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;
