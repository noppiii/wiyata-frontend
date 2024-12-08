import axios from 'axios';

export const login = async (userName, password) => {
    try {
        const response = await axios.post(`/api/v1/auth/login`, userName, password);
        if (response.isAxiosError) {
            return response.response;
        }
        axios.defaults.headers.common['authorization'] =
            response.headers.authorization;
        return response;
    } catch (e) {
        return e;
    }
}

export const signup = async (userName, email, password, nickName, birthday, gender,) => {
    try {
        const res = await axios.post('/api/v1/auth/signup', {userName, email, password, nickName, birthday, gender});
        if (res.status === 201 || res.status === 200) {
            return res;
        }
        if (res.response.status === 400) {
            return res.response;
        }
        return res;
    } catch (e) {
        return e;
    }
}

export const userCheck = async () => {
    try {
        const response = await axios.get('/api/v1/auth/status');
        return response;
    } catch (e) {
        return e.response;
    }
};

export const refresh = async () => {
    const response = await axios.get('/api/v1/auth/refresh', {
        validateStatus: function (status) {
            return status <= 500;
        },
    });
    return response;
};

export const logout = async () => {
    const response = await axios.post('/api/v1/auth/logout');
    // eslint-disable-next-line no-restricted-globals
    location.reload();
    return response;
};

export const emailCheck = async (email, uuid) => {
    const response = await axios.get(`/api/v1/auth/email?email=${email}&uuid=${uuid}`, {
        validateStatus: function (status) {
            return status <= 500;
        },
    });
    return response;
};

export const checkUserName = async ({ userName }) => {
    const response = await axios.get(`/api/v1/member/username/${userName}`);
    return response;
};

export const checkNickName = async ({ nickName }) => {
    const response = await axios.get(`/api/v1/member/${nickName}`);
    return response;
};

export const checkEmail = async ({ email }) => {
    const response = await axios.get(`/api/email/${email}`);
    return response;
};