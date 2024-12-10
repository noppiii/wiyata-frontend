import React from 'react';
import UseWays from '../../components/Landing/UseWays';
import styled from 'styled-components';
import BackImg from '../../lib/images/landingBackV2.png';
import BackImg_small from '../../lib/images/landingBackV2_small.png';
import BannerBackImg from '../../lib/images/bannerBack.jpg';
import { MdSearch } from 'react-icons/md';
import { Link } from 'react-router-dom';
import palette from "../../lib/styles/palette";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlexBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${palette.landing};
  padding: 0% 0%;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
`;

const SubContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  @media screen and (max-width: 1023px) {
    margin-top: 50px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 40px;
  }
`;

const TextH3 = styled.div`
  font-size: 35px;
  font-weight: 350;
  line-height: 50px;
  @media screen and (max-width: 1023px) {
    font-size: 30px;
    line-height: 30px;
  }
  @media screen and (max-width: 767px) {
    font-size: 20px;
    line-height: 20px;
  }
`;

const TextH2 = styled.div`
  font-size: 50px;
  font-weight: 700;
  line-height: 80px;
  @media screen and (max-width: 1023px) {
    font-size: 40px;
    line-height: 60px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 10px;
    font-size: 25px;
    line-height: 40px;
  }
`;

const MainContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vw * 0.39);
  background-size: 100vw calc(100vw * 0.39);
  background-image: url(${BackImg});
  background-repeat: no-repeat;
  background-position: center top;
  background-color: #ffd0c0;
  @media screen and (max-width: 767px) {
    background-image: url(${BackImg_small});
    /* height: calc(100vw * 0.49); */
    height: 350px;
    background-size: 100vw calc(100vw * 0.5);
    background-position: center bottom;
  }
`;

const InputContainer = styled.div`
  margin: 50px 0px;
  background-color: white;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  box-shadow: 4px 4px 4px grey;
  padding-right: 20px;
  @media screen and (max-width: 767px) {
    /* height: 130px; */
  }
`;

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(MdSearch)`
  font-size: 25px;
  margin: 0px 20px;
  opacity: 0.5;
  @media screen and (max-width: 767px) {
    margin: 0px 10px;
  }
`;

const Input = styled.input`
  padding: 0;
  width: 500px;
  font-size: 14px;
  border: none;
  :focus {
    outline: none;
  }
  ::placeholder {
    font-size: 14px;
  }
  @media screen and (max-width: 767px) {
    width: 200px;
  }
`;

const GoDirBtn = styled(Link)`
  text-decoration: none;
  background-color: #f16b6c;
  width: 200px;
  height: 50px;
  color: white;
  /* border: none; */
  border-radius: 5px;
  box-shadow: 4px 4px 4px grey;
  font-size: 18px;
  font-weight: 520;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerMain = styled.div`
  white-space: pre-line;
  font-weight: 700;
  font-size: 45px;
  line-height: 54px;
  margin-bottom: 25px;

  > div {
    color: rgb(251, 229, 118);
  }

  @media screen and (max-width: 1023px) {
    font-size: 32px;
    line-height: 40px;
  }
  @media screen and (max-width: 767px) {
    font-size: 22px;
    line-height: 27px;
    margin-bottom: 10px;
  }
`;

const BannerSub = styled.div`
  white-space: pre-wrap;
  font-size: 20px;
  line-height: 24px;
  font-weight: 500;
  > div {
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #ffe3e3;
  }

  @media screen and (max-width: 1023px) {
    font-size: 16px;
    line-height: 20px;
    > div {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 767px) {
    font-size: 12px;
    line-height: 16px;
    > div {
      font-size: 11px;
    }
  }
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 1000px;
  height: 315px;
  border-radius: 23px;
  background: #f16b6c;
  color: white;
  text-align: center;
  box-shadow: 0px 14px 10px rgba(0, 0, 0, 0.11);
  position: relative;
  top: -200px;
  background-image: url(${BannerBackImg});
  background-repeat: no-repeat;
  background-position: center top;

  @media screen and (max-width: 1023px) {
    width: 750px;
    height: 220px;
    top: -100px;
  }
  @media screen and (max-width: 767px) {
    width: 90%;
    height: 150px;
    top: -80px;
  }
`;

const SearchDes = styled(Link)`
  text-decoration: none;
  color: ${palette.red};
`;

const LandingMainContents = () => {
    return (
        <Container>
            <FlexBox>
                <Contents>
                    <SubContents>
                        <TextH3>Berhentilah membuat rencana perjalanan yang rumit!</TextH3>
                        <TextH2>Yang terbaik dalam perencanaan perjalanan, Wiyata!</TextH2>
                    </SubContents>
                    <MainContents>
                        <InputContainer>
                            <Div>
                                <SearchIcon />
                                <Input placeholder="Saat ini hanya melayani Pulau Jawa!" />
                            </Div>
                            <SearchDes to={process.env.PUBLIC_URL + '/search'}>
                                Cari
                            </SearchDes>
                        </InputContainer>
                        <GoDirBtn to={process.env.PUBLIC_URL + '/canvas/directory'}>
                            Pergi ke loker perjalanan
                        </GoDirBtn>
                    </MainContents>
                </Contents>
            </FlexBox>
            <Banner>
                <BannerMain>
                    Layanan beta Wiyata<div>OPEN!</div>
                </BannerMain>
                <BannerSub>
                    Silakan tinggalkan komentar Anda tentang layanan beta Wiyata.
                    <div>wiyata@gmail.com</div>
                </BannerSub>
            </Banner>
            <UseWays />
        </Container>
    );
};

export default LandingMainContents;