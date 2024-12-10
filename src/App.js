import React, { Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Modal from 'react-modal';
import { createGlobalStyle, css } from 'styled-components';
import {useScroll} from "./lib/custom/useScroll";
import Spinner from "./lib/custom/Spinner";
// router lazy

const LandingPage = lazy(() => import('./pages/OtherPages/LandingPage'));

const GlobalStyle = createGlobalStyle`
  body::-webkit-scrollbar {
    display: none;
    ${(props) =>
    props.isScroll &&
    css`
        display: block;
      `}
  }
`;

function App() {
    const { scrollY } = useScroll();

    return (
        <>
            <Suspense fallback={<Spinner />}>
                {useRoutes([
                    { path: process.env.PUBLIC_URL + '/', element: <LandingPage /> }
                ])}
            </Suspense>
            <GlobalStyle isScroll={scrollY} />
        </>
    );
}

Modal.setAppElement('#root');

export default App;
