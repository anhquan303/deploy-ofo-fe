import apiBase from '../../utils/baseAPI';
import axios from 'axios';

export const apiFetchData = (data) => {
    return new Promise((resolve, reject) => {
        return apiBase
            .get(`${data[0]}`, data[1])
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}

export const apiGetListWards = (data) => {
    return new Promise((resolve, reject) => {
        return axios
            .get("https://provinces.open-api.vn/api/d/276?depth=2")
            .then((res) => resolve(res))
            .catch((err) => reject(err));
    });
}