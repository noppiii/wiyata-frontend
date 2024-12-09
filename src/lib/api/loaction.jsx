import axios from 'axios';

export const getLocationInfo = async (id, type) => {
    try {
        const response = await axios.get(`/api/v1/location/${id}?locationType=${type}`);
        return response;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const getBlockLocations = async () => {
    try {
        const response = await axios.get('/api/v1/location/block');
        return response;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const getMarkLocations = async () => {
    try {
        const response = await axios.get('/api/v1/location/mark');
        return response;
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const postSelectedLocations = async (planId, selectedLocation) => {
    try {
        const response = await axios.post(
            `/api/v1/member/plan/${planId}/selected-location`,
            {
                selectedLocationForm: {
                    selectedLocation,
                },
            },
        );
        if (response.status !== 200) {
            return 0;
        } else {
            return response;
        }
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const getSelectedLocations = async (planId) => {
    try {
        const response = await axios.get(
            `/api/v1/member/plan/${planId}/selected-location`,
        );
        if (response.status !== 200) {
            return 0;
        } else {
            return response;
        }
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const createMemberLocation = async (location) => {
    try {
        const response = await axios.post('/api/v1/location/member', {
            memberLocation: location.memberLocation,
            information: location.information,
            typeLocation: location.typeLocation,
            location: location.location,
        });
        if (response.status !== 201) {
            return 0;
        } else {
            return response;
        }
    } catch (err) {
        console.log(err);
        return 0;
    }
};

export const getMemberLocation = async () => {
    try {
        const response = await axios.get('/api/v1/location/member');
        if (response.status !== 200) {
            return 0;
        } else {
            return response;
        }
    } catch (err) {
        console.log(err);
        return 0;
    }
};