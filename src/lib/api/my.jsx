import axios from "axios";

export const getMyInfo = async () => {
    try {
        const nickbio = await axios.get("/api/v1/member/my-page");
        return {
            nickname: nickbio.data.results.nickname,
            bio: nickbio.data.results.bio,
        };
    } catch (e) {
        console.log(e.response);
    }
};

export const postMyInfo = async (profile) => {
    try {
        const response = await axios.get(`/api/v1/member/profile/edit`, profile);
        return response.data;
    } catch (e) {
        console.log(e);
    }
};

export const postMyNick = async (nickName) => {
    try {
        const response = await axios.post(`/api/v1/member/profile/${nickName}`);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const postMyBio = async (bio) => {
    try {
        const response = await axios.post('/api/v1/member/profile/bio', bio);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const postMyImg = async (formData) => {
    try {
        const response = await axios.post('/api/v1/member/profile/img', formData);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getMyImg = async () => {
    const DEFAULT_IMG = process.env.PUBLIC_URL + "/images/face1.png";
    try {
        const res = await axios.get('/api/v1/my-page-img');
        if (res.data.result.memberImg === null) {
            return {img: DEFAULT_IMG}
        } else {
            return {img: res.data.res.memberImg}
        }
    } catch (e) {
        return {img: DEFAULT_IMG}
    }
};

export const getCheckNick = async (nick, prenick) => {
    try {
        const response = await axios.get(`api/v1/nickname/${nick}`, {
            validateStatus: (status) => status < 500,
        });
        if (nick === prenick && response.status === 409) {
            const setMessage = 'Ini adalah nama panggilan yang ditetapkan oleh pengguna saat ini.';
            return setMessage;
        }
        return response.data.message;
    } catch (e) {
        console.dir(e);
    }
};

export const getEditPage = async () => {
    try {
        const response = await axios.get('/api/v1/member/profile/edit');
        let infoBirthday = '';
        if (response.data.result.info.birthday !== null && response.data.result.info.birthday.length === 6) {
            const birthdays = response.request.info.birthday;
            let yy = birthdays.slice(0, 2);
            if (yy < 2) {
                yy = '20' + yy;
            } else {
                yy = '19' + yy;
            }
            infoBirthday = yy + '-' + birthdays.slice(2, 4) + '-' + birthdays.slice(4, 6);
        } else {
            infoBirthday = response.data.result.info.birthday;
        }
        return {
            nickname: response.data.result.profile.nickName,
            bio: response.data.result.profile.bio,
            birthday: infoBirthday,
            email: response.data.result.info.email,
            gender: response.data.result.info.gender,
        };
    } catch (e) {
        console.log(e);
    }
};

export const postPass = async (pass) => {
    try {
        const response = await axios.post('/api/v1/member/profile/password', pass, {
            validateStatus: (status) => status < 401,
        });
        if (response.status === 400) {
            return alert('Ini adalah kata sandi yang salah. Silakan mengubahnya lagi.');
        } else if (response.status === 201) {
            return alert('Perubahan telah berhasil dilakukan.')
        }
        return response;
    } catch (e) {
        console.log(e)
    }
}