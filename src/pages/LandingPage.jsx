import React from 'react';
import styled from 'styled-components';
import { PiArmchairDuotone } from "react-icons/pi";
import backgroundImage from '../assets/images/i1.jpg'; 

const LandingPageWrapper = styled.div`
  background-color: #75e6da;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  min-height: 180vh;
`;

const HeaderSection = styled.div`
  text-align: center;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  color: #000; 
  font-weight: bold; 
  text-transform: uppercase;
  margin-bottom: 10px;
  font-family: 'Playfair Display', serif;
  animation: fadeIn 2s ease-in-out, slideIn 1.5s ease-out;
  display: inline-block;
  position: relative;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    0% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
    }
  }
`;


const SubHeading = styled.p`
  font-size: 1rem;
  color: #666;
`;

const BgImage = styled.div`
  background-image: url(${backgroundImage});
  height: 90vh;
  border-radius: 5%;
  width: 90%;
  background-size: cover;
  background-position: center;
  width: 100%;
`;

const FeaturesSection = styled.div`
  margin: 40px 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const FeatureCard = styled.div`
  background: linear-gradient(120deg, #89f7fe, #66a6ff);
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  max-width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s, background 0.3s;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
    background: linear-gradient(120deg, #66a6ff, #89f7fe); /* New hover gradient */
  }
`;


const Icon = styled.div`
  font-size: 2rem;
  color: #007bff;
  margin-bottom: 10px;
`;

const CardTitle = styled.h5`
  font-size: 1.25rem;
  margin-bottom: 10px;
  color: #333;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #555;
`;

const LandingPage = () => {
  return (
    <LandingPageWrapper>
      <HeaderSection>
        <Heading>Welcome to the Convocation Seating Arrangement System!</Heading>
        <SubHeading>
          This system is designed to help you manage the seating arrangements for your university's convocation ceremony.
        </SubHeading>
      </HeaderSection>

      <BgImage></BgImage>

      <FeaturesSection>
          <FeatureCard>
            <Icon>
              <i className="fas fa-chair"></i>
            </Icon>
            <CardTitle>Graduate Seating</CardTitle>
            <CardText>Organized seating for graduates to ensure a smooth and memorable convocation experience.</CardText>
          </FeatureCard>

          <FeatureCard>
            <Icon>
              <i className="fas fa-user-friends"></i>
            </Icon>
            <CardTitle>Guest Arrangement</CardTitle>
            <CardText>Dedicated seating areas for family and friends to celebrate your special day with ease.</CardText>
          </FeatureCard>

          <FeatureCard>
            <Icon>
              <PiArmchairDuotone id="chair" />
            </Icon>
            <CardTitle>Seat Layout</CardTitle>
            <CardText><CardText>Detailed seat layouts designed for easy navigation, ensuring all attendees find their assigned spots quickly and comfortably.</CardText>
            </CardText>
          </FeatureCard>
        </FeaturesSection>

    </LandingPageWrapper>
  );
};

export default LandingPage;
