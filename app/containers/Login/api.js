import apiBase from '../../utils/baseAPI';

export const apiFetchData = (data) => {
    return new Promise((resolve, reject) => {
        return apiBase
            .get(`${data[0]}`, data[1])
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}

export const apiLogin = (data, payload) => {
    console.log('api', data[1])
    console.log('data', payload)
    return new Promise((resolve, reject) => {
        return apiBase
            .post(`${data[0]}`, payload)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}