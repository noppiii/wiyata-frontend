import axios from 'axios';

export const createPlan = async (userPlan) => {
    try {
        const response = await axios.post('/api/v1/member/plans', {
            planForm: userPlan,
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const getPlan = async (id) => {
    try {
        const response = await axios.get(`/api/v1/member/plan/${id}`);
        return response.data;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const getConcpet = async (id) => {
    try {
        const response = await axios.get(`/api/v1/member/plan/${id}/concept`);
        return response.data;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const postPlan = async (id, userPlan) => {
    try {
        const response = await axios.post(`/api/v1/member/plan/${id}`, userPlan);
        return response.data;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const postConcept = async (id, conceptForm) => {
    try {
        const response = await axios.post(`/api/v1/member/plan/${id}/concept`, {
            conceptForm: conceptForm,
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const postThumbnail = async (id, file) => {
    try {
        const response = await axios({
            method: 'post',
            url: `/api/v1/member/${id}/thumbnail`,
            data: file,
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const postPlanDay = async (dayForm, id) => {
    try {
        const response = await axios.post(`/api/v1/member/plan/${id}/day`, {
            dayForm: {
                travelDay: dayForm.travelDay,
            },
        });
        return response;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const updatePlanDay = async (dayForm, id) => {
    try {
        const response = await axios.put(`/api/v1/member/plan/${id}/day`, {
            dayForm,
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const getPlanDay = async (id) => {
    try {
        const response = await axios.get(`/api/v1/member/plan/${id}/day`);
        return response.data;
    } catch (err) {
        console.log(err);
        return 0;
    }
};