import styled, {css} from "styled-components";
import { MdMenu } from 'react-icons/md';
import palette from "../../lib/styles/palette";
import {Link} from "react-router-dom";
import React, { useState } from 'react';
import Logo from './Logo';
import {Mobile, Pc} from "../../lib/custom/responsive";


const DEFAULT_IMAGE = process.env.PUBLIC_URL + '/images/face1.png';

const Container = styled.div`
  width: 100%;
  background-color: ${(props) =>
    props.type === 'landing' ? palette.landing : palette.back2};
`;

const HeaderDiv = styled.div`
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    margin: 0 auto;

    @media screen and (max-width: 767px) {
        display: block;
    }
`;

const SubFlex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Menu = styled.div`
    display: flex;
    @media screen and (max-width: 767px) {
        display: block;
        ${(props) =>
                !props.btnMenu &&
                css`
                    display: none;
                `}
    }
`;

const HoverProfile = styled.div`
    display: none;
    position: absolute;
    z-index: 1;
    background-color: ${palette.back1};
    top: 60px;
    border-radius: 10px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
`;

const MenuEl = styled(Link)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  padding: 10px 20px;
  font-size: 17px;
  font-weight: 550;

  text-decoration: none;

  @media screen and (max-width: 767px) {
    font-size: 13px;
    margin-left: 0px;
    width: 100%;
    text-align: center;
    :hover {
      transition: all 0.15s linear;
      background-color: white;
      border-radius: 10px;
    }
  }
`;

const MenuBtn = styled(MdMenu)`
  display: none;
  @media screen and (max-width: 767px) {
    display: block;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 550;
  :hover {
    ${HoverProfile} {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
`;

const HoverLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  font-size: 15px;
  font-weight: 450;
  color: black;
  padding: 15px;
  text-align: center;
  :hover {
    background: ${palette.back2};
    border-radius: 10px;
  }
`;

const Thumbnail = styled.img`
  padding: 5px;
  width: 45px;
  height: 45px;
  background-color: ${palette.landingThumbnail};
  border-radius: 50%;
`;

const Header = ({userState, onLogout, type, profileImg}) => {
    const [menu, setMenu] = useState(false);

    const btnClick = () => {
        setMenu(!menu);
    };

    const handleImgError = (e) => {
        e.target.src = DEFAULT_IMAGE;
    };

    return(
        <Container itemType={type}>
            <HeaderDiv>
                <SubFlex>
                    <Logo />
                    <MenuBtn onClick={btnClick} />
                </SubFlex>
                <Menu btnMenu={menu}>
                    {userState ? (
                        <>
                        <MenuEl to={process.env.PUBLIC_URL + '/canvas/directory'}>
                            Kotak Penyimpanan Perjalanan
                        </MenuEl>
                            <Pc>
                                <Profile>
                                    <Thumbnail src={profileImg}
                                               alt=""
                                               onError={(e) => handleImgError()} />
                                    {userState.nickName}
                                    <HoverProfile>
                                        <HoverLink to={process.env.PUBLIC_URL + '/mypage/MyInfo'}>
                                            Halaman Saya
                                        </HoverLink>
                                        <HoverLink to={process.env.PUBLIC_URL} onClick={onLogout} >
                                            Keluar
                                        </HoverLink>
                                    </HoverProfile>
                                </Profile>
                            </Pc>

                            <Mobile>
                                <MenuEl to={process.env.PUBLIC_URL + '/mypage/MyInfo'}>
                                    Halaman Saya
                                </MenuEl>
                                <MenuEl to={process.env.PUBLIC_URL} onClick={onLogout}>
                                    Keluar
                                </MenuEl>
                            </Mobile>
                            <MenuEl to={process.env.PUBLIC_URL + '/notice'}>Notifikasi</MenuEl>
                        </>
                    ) : (
                        <>
                            <MenuEl to={process.env.PUBLIC_URL + '/signup'}>SignUp</MenuEl>
                            <MenuEl to={process.env.PUBLIC_URL + '/login'}>Login</MenuEl>
                            <MenuEl to={process.env.PUBLIC_URL + '/notice'}>Notifikasi</MenuEl>
                        </>
                    )}
                </Menu>
            </HeaderDiv>
        </Container>
    )
}

export default Header;