import api from 'utils/api.js'

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