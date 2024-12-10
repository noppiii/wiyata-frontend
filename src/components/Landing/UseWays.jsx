import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import ModalModule from 'components/common/modal/ModalModule';

const Container = styled.div`
  max-width: 1400px;
  margin-bottom: 7%;
`;

const List = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const Way = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 277px;
  width: 277px;
  border-radius: 15px;
  background-color: #f2f2f2;
  padding: 20px;
  justify-content: space-around;
  flex-basis: 22%;
  margin: 10px 10px;
  mix-blend-mode: luminosity;
  opacity: 0.4;

  ${(props) =>
    props.active &&
    css`
        mix-blend-mode: normal;
        opacity: 1;

        cursor: pointer;

        :hover {
            box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
            background-color: white;
            -webkit-transition: box-shadow ease-in-out 0.15s;
            transition: all ease-in-out 0.15;
        }
    `}

  @media screen and (max-width: 1023px) {
    flex-basis: 32%;
  }
  @media screen and (max-width: 767px) {
    flex-basis: 60%;
  }
`;

const Img = styled.img`
  height: 100px;
  width: 120px;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const H3 = styled.h3`
  margin: 5px;
  font-weight: 700;
  font-size: 19px;

  @media screen and (max-width: 767px) {
    font-size: 14px;
  }
`;

const Detail = styled.div`
  text-align: center;
  font-weight: 300;
  font-size: 14px;
  line-height: 17px;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

const WayImg = styled.img`
  width: 100%;
`;

const useWaysData = [
    {
        header: 'Cara Menggunakan Layanan',
        image: process.env.PUBLIC_URL + '/images/block1.png',
        contents: 'Kami akan menunjukkan cara menggunakan Travelock!',
        active: true,
    },
    {
        header: 'Sedang Disiapkan',
        image: process.env.PUBLIC_URL + '/images/block2.png',
        contents: 'Akan tersedia setelah layanan beta.',
        active: false,
    },
    {
        header: 'Sedang Disiapkan',
        image: process.env.PUBLIC_URL + '/images/block3.png',
        contents: 'Akan tersedia setelah layanan beta.',
        active: false,
    },
    {
        header: 'Sedang Disiapkan',
        image: process.env.PUBLIC_URL + '/images/block4.png',
        contents: 'Akan tersedia setelah layanan beta.',
        active: false,
    },
];

const UseWays = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <Container>
            <List>
                {useWaysData.map((way, i) => {
                    return (
                        <Way
                            key={i}
                            active={way.active}
                            onClick={way.active ? () => openModal() : null}
                        >
                            <Img src={way.image} alt="blok gambar" />
                            <Div>
                                <H3>{way.header}</H3>
                                <Detail>{way.contents}</Detail>
                            </Div>
                        </Way>
                    );
                })}
            </List>
            <ModalModule
                modalIsOpen={modalIsOpen}
                openModal={openModal}
                closeModal={closeModal}
                title="Cara menggunakan layanan ini"
                map="moveLoc"
                img="img"
            >
                <WayImg
                    src={process.env.PUBLIC_URL + '/images/serviceDetailWEBP.webp'}
                    alt=""
                />
            </ModalModule>
        </Container>
    );
};

export default UseWays;