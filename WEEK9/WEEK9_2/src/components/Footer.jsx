import React from 'react'
import styled from 'styled-components';

const Footer = () => {
    return (
        <>
            <FooterContainer> University Makeus Challenge</FooterContainer>
        </>
    )
}

export default Footer;

const FooterContainer = styled.footer`
  display: flex;
  bottom: 0;
  align-items: center;
  justify-content: space-between;
  padding: 20px 20px;
  background-color: #6c5ce7;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  color: white;
`;