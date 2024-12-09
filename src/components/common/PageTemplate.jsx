import React from 'react';
import styled from 'styled-components';
import palette from "../../lib/styles/palette";
import HeaderContainer from "./HeaderContainer";

const Container = styled.div`
  height: 100%;
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${palette.back2};
`;

const PageTemplate = ({ children, type }) => {
    return (
        <Container>
            <HeaderContainer type={type} />
            {children}
        </Container>
    );
};

export default PageTemplate;