import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #05445e;
  color: #ffffff;
  padding: 40px 20px;
  text-align: center;
`;

// const FooterContent = styled.div`
//   display: flex;
//   justify-content: space-between;
//   flex-wrap: wrap;
//   gap: 20px;
// `;

// const Section = styled.div`
//   flex: 1;
//   min-width: 150px;

//   h4 {
//     margin-bottom: 10px;
//     font-size: 18px;
//   }

//   ul {
//     list-style: none;
//     padding: 0;

//     li {
//       margin: 5px 0;
//       font-size: 16px;
//     }

//     a {
//       color: #ffffff;
//       text-decoration: none;

//       &:hover {
//         text-decoration: underline;
//       }
//     }
//   }
// `;

// const FeaturedLogos = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   gap: 15px;
//   margin: 20px 0;

//   img {
//     height: 40px;
//     object-fit: contain;
//   }
// `;

// const SocialLinks = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 10px;

//   a {
//     color: #ffffff;
//     font-size: 24px;

//     &:hover {
//       color: #00bcd4;
//     }
//   }
// `;

const BottomBar = styled.div`
  // border-top: 1px solid #ffffff;
  // margin-top: 20px;
  // padding-top: 10px;
  font-size: 14px;

  a {
    color: #ffffff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <BottomBar>
        © 2024 . All rights reserved. | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
      </BottomBar>
    </FooterContainer>
  );
};

export default Footer;