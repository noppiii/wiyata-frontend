import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const LogoContainer = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) =>
    !props.auth &&
    css`
      flex-direction: row;
      ${LogoImg} {
        width: 45px;
        margin-bottom: 0px;
        margin-right: 15px;
      }

      ${LogoLetter} {
        height: 15px;
      }
    `}
`;

const LogoImg = styled.img`
  width: 120px;
  margin-bottom: 25px;
`;

const LogoLetter = styled.img`
  height: 30px;
`;

const Logo = ({ auth }) => {
    return (
        <LogoContainer to={process.env.PUBLIC_URL + '/'} auth={auth}>
            <LogoImg
                alt="LogoImage"
                src={process.env.PUBLIC_URL + '/images/logoPaintingV2.png'}
            />
            <LogoLetter
                alt="LogoLetter"
                src={process.env.PUBLIC_URL + '/images/logoLetterV2.png'}
            />
        </LogoContainer>
    );
};

export default Logo;