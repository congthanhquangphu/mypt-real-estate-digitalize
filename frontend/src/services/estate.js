import api from 'utils/api.js'

const estate = {
    async registry(data) {
        return await api.post('/estate/registry', data);
    },
    async getCount(data) {
        return await api.post("/estate/getCount", data);
    },
    async getList(data) {
        return await api.post("/estate/getList", data);
    },
    async getInformation(data) {
        return await api.post("/estate/getInformation", data);
    },
    async uploadIPFS(data) {
        return await api.post("/estate/uploadIPFS", data);
    },
    async acceptRegistry(data) {
        return await api.post("/estate/acceptRegistry", data);
    }
}

export default estate;