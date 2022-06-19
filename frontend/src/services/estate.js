import api from 'utils/api.js'

export const registry = async (data, callback) => {
    try {
        const res = await api.post('/estate/registry', data);
        callback(null, res);
    } catch (err) {
        callback(err, null);
    }
}

export const getCount = async (data, callback) => {
    try {
        let res = await api.post("/estate/getCount", data);
        callback(null, res);
    } catch (err) {
        callback(err, null);
    }
}

export const getList = async (data, callback) => {
    try {
        let res = await api.post("/estate/getList", data);
        callback(null, res);
    } catch (err) {
        callback(err, null);
    }
}

export const getInformation = async (data, callback) => {
    try {
        let res = await api.post("/estate/getInformation", data);
        callback(null, res);
    } catch (err) {
        callback(err, null);
    }
}

export const uploadIPFS = async (data, callback) => {
    try {
        let res = await api.post("/estate/uploadIPFS", data);
        callback(null, res);
    } catch (err) {
        callback(err, null);
    }
}

export const mintToken = async (data, callback) => {
    try {
        let res = await api.post("/estate/acceptRegistry", data);
        callback(null, res);
    } catch (err) {
        callback(err, null);
    }
}