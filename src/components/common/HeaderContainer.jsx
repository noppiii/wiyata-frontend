import React, { useEffect, useState } from 'react';
import { logout } from 'lib/redux/modules/user';
import { useSelector, useDispatch } from 'react-redux';
import { getMyImg } from 'lib/api/my';
import Header from "../Landing/Header";

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