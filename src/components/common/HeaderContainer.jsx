import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from "../Landing/Header";
import {logout} from "../../lib/redux/modules/user";
import {getMyImg} from "../../lib/api/my";

const HeaderContainer = ({ type }) => {
    const { userState } = useSelector(({ user }) => ({
        userState: user.userState,
    }));
    const [profileImg, setProfileImg] = useState(null);

    useEffect(() => {
        (async () => {
            const img = await getMyImg();
            setProfileImg(img);
        })();
    }, []);

    const dispatch = useDispatch();
    const onLogout = async () => {
        dispatch(logout());
    };
    return (
        <Header
            userState={userState}
            onLogout={onLogout}
            type={type}
            profileImg={profileImg ? profileImg.img : null}
        />
    );
};

export default HeaderContainer;