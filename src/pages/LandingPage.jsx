import React from 'react';
import styled from 'styled-components';
import { PiArmchairDuotone } from "react-icons/pi";
import backgroundImage from '../assets/images/i1.jpg'; 

const LandingPageWrapper = styled.div`
  background-color: #d4f1f4;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  min-height: 180vh;
`;

const HeroSection = styled.div`
  height: 500px;

  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 480px) {
    height: 350px;
  }
`;

const BgImage = styled.div`
  position: relative;
  background-image: url(${backgroundImage});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
`;

const HeroText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  padding: 20px 30px;
  border-radius: 10px;
  max-width: 90%;
  opacity: 0;
  animation: fadeIn 2s forwards;

  h1 {
    font-size: 3rem;
    margin-bottom: 15px;
    font-family: "Brush Script MT", cursive;
    font-weight: 500;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }

    @media (max-width: 480px) {
      font-size: 1.8rem;
    }
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (max-width: 480px) {
      font-size: 0.9rem;
    }
  }

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;
const Heading = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(90deg, #a1c4fd, #c2e9fb, #b9fbc0); 
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  white-space: nowrap;   /* ✅ Prevent wrapping */
  text-transform: uppercase;
  animation: fadeIn 2s ease-in-out, slideIn 1.5s ease-out;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes slideIn {
    0% { transform: translateY(-20px); }
    100% { transform: translateY(0); }
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const SubHeading = styled.p`
  font-size: 1.2rem;
  color: #fff;
  font-family: 'Montserrat', sans-serif;
  margin-top: 10px;
  opacity: 0;
  animation: fadeIn 2s forwards;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const FeaturesHeadingWrapper = styled.div`
  display: inline-block;
  backdrop-filter: blur(10px);
  padding: 10px 20px;
  border-radius: 8px;
  text-align: center;
  margin-left: 40%;
  margin-top: 2%;

  @media (max-width: 768px) {
    margin-left: 20%;
  }

  @media (max-width: 480px) {
    margin-left: 10%;
  }
`;

const FeaturesHeading = styled.h3`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Roboto', sans-serif;
  animation: fadeIn 1.5s ease-in-out, glowText 1.5s infinite alternate;

  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes glowText {
    0% { text-shadow: 0 0 10px rgba(0, 123, 255, 0.7); }
    100% { text-shadow: 0 0 20px rgba(0, 123, 255, 1); }
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const FeaturesSection = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  opacity: 0;
  animation: fadeInSection 2s ease-in-out forwards;

  @keyframes fadeInSection {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FeatureCard = styled.div`
  background: linear-gradient(120deg, rgb(45, 128, 134), rgb(100, 149, 217));
  border-radius: 8px;
  padding: 20px;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s, background 0.3s ease-in-out;
  text-align: center;
  opacity: 0;
  animation: fadeInCard 2s ease-in-out forwards;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    background: linear-gradient(120deg, rgb(85, 107, 139), #89f7fe);
  }

  @keyframes fadeInCard {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const Icon = styled.div`
  font-size: 2rem;
  color: rgb(70, 72, 75);
  margin-bottom: 10px;
  transition: transform 0.3s ease, color 0.3s ease;

  &:hover {
    transform: scale(1.3);
    color: #ff7f50;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;

const CardTitle = styled.h5`
  font-size: 1.5rem;
  color: #000;
  font-family: 'Montserrat', sans-serif;
  font-weight: bold;
  margin-bottom: 10px;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #555;
  font-family: 'Montserrat', sans-serif;
  opacity: 0;
  animation: fadeInText 1.5s ease-out forwards;

  @keyframes fadeInText {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
`;

const LandingPage = () => {
  return (
    <LandingPageWrapper>
      <HeroSection>
        <BgImage>
          <HeroText>
            <Heading>Welcome to the Convocation Seating Hub!</Heading>
            <SubHeading>
              This system is designed to help you manage the seating arrangements for your university's convocation ceremony.
            </SubHeading>
          </HeroText>
        </BgImage>
      </HeroSection>

      <FeaturesHeadingWrapper>
        <FeaturesHeading>Our Features</FeaturesHeading>
      </FeaturesHeadingWrapper>

      <FeaturesSection>
        <FeatureCard>
          <Icon><i className="fas fa-chair"></i></Icon>
          <CardTitle>Graduate Seating</CardTitle>
          <CardText>Organized seating for graduates to ensure a smooth and memorable convocation experience.</CardText>
        </FeatureCard>

        <FeatureCard>
          <Icon><i className="fas fa-user-friends"></i></Icon>
          <CardTitle>Guest Arrangement</CardTitle>
          <CardText>Dedicated seating areas for family and friends to celebrate your special day with ease.</CardText>
        </FeatureCard>

        <FeatureCard>
          <Icon><PiArmchairDuotone /></Icon>
          <CardTitle>Seat Layout</CardTitle>
          <CardText>Detailed seat layouts designed for easy navigation and comfort for all attendees.</CardText>
        </FeatureCard>

        <FeatureCard>
          <Icon><i className="fas fa-map-marker-alt"></i></Icon>
          <CardTitle>Venue Map</CardTitle>
          <CardText>Interactive venue map to help attendees locate their seats and amenities effortlessly.</CardText>
        </FeatureCard>

        <FeatureCard>
          <Icon><i className="fas fa-bullhorn"></i></Icon>
          <CardTitle>Announcements</CardTitle>
          <CardText>Real-time updates and event announcements to keep everyone informed.</CardText>
        </FeatureCard>

        <FeatureCard>
          <Icon><i className="fas fa-calendar-alt"></i></Icon>
          <CardTitle>Event Scheduling</CardTitle>
          <CardText>Full schedule overview of ceremony timings, speeches, and entertainment sessions.</CardText>
        </FeatureCard>

        <FeatureCard>
          <Icon><i className="fas fa-clipboard-list"></i></Icon>
          <CardTitle>Graduate List</CardTitle>
          <CardText>Searchable list of graduates with assigned seats, degrees, and honors.</CardText>
        </FeatureCard>
      </FeaturesSection>
    </LandingPageWrapper>
  );
};

export default LandingPage;
