import db from '#src/utils/db'

export default {

    async registry(entity) {
        entity['approval'] = 'pending';

        return await db('estate').insert(entity);
    },

    async countByRegister(registerAddress, approval) {
        const data = {
            'registerAddress': registerAddress,
        };
        if (approval) {
            data['approval'] = approval;
        }
        const result = await db('estate').count('*').where(data)
        return result[0].count;
    },

    async getByRegister(registerAddress, approval, limit, offset) {
        const data = {
            'registerAddress': registerAddress,
        }
        if (approval) {
            data['approval'] = approval
        }
        return await db('estate').where(data).offset(offset).limit(limit);
    },

    async getById(estateId) {
        const result = await db('estate').where({
            'id': estateId
        })
        return result[0] || null;
    },

    async getCertificatePathById(estateId) {
        const result = await db('estate').select('certificatePath').where({
            'id': estateId
        })
        return result[0].certificatePath || null;
    },

    async acceptRegistry(estateId, tokenId, cid) {
        await db('estate').where({
            "id": estateId
        }).update({
            "tokenId": tokenId,
            "approval": "approved",
            "ipfsCid": cid
        })
    }
}