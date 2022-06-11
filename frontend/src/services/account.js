import api from 'utils/api.js'

export const signup = async (data, callback) => {
    try {
        let res = await api.post("/account/signup", data);
        callback(null, res);
    } catch (err) {
        callback(err, null);
    }
}

export const login = async (data, callback) => {
    try {
        let res = await api.post("/account/login", data)
        callback(null, res)
    } catch (err) {
        callback(err, null)
    }
}

export const getInformation = async (data, callback) => {
    try {
        let res = await api.get("/account/getInformation", data)
        callback(null, res)
    } catch (err) {
        callback(err, null)
    }
}