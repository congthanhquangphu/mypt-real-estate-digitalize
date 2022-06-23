import estate from '#src/models/estate'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import config from '#src/config/config'

export default {

    async registry(req, res) {
        const {
            title,
            register_address,
            location,
            profit,
            land_area,
            construction_area,
            description,
            total_supply,
            certificate_path
        } = req.body;
        const entity = {
            title,
            register_address,
            location,
            profit,
            land_area,
            construction_area,
            description,
            total_supply,
            certificate_path,
        }
        try {
            estate.registry(entity)

            res.send({
                exitcode: 0,
                message: "Registry successfully"
            })
        } catch (err) {
            console.error(err)
            res.send({
                exitcode: 1,
                message: err
            })
        }
    },

    async getCount(req, res) {
        const { register_address, approval } = req.body;
        try {
            const result = await estate.countByRegister(register_address, approval)
            res.send({
                exitcode: 0,
                count: result,
            })
        } catch (err) {
            console.error(err)
            res.send({
                exitcode: 1,
                message: err
            })
        }
    },

    uploadCertificate(req, res) {
        const { fileName } = req.body
        res.send({
            exitcode: 0,
            message: "Upload file successfully",
            certificatePath: fileName
        })
    },

    async uploadIPFS(req, res) {
        const { estate_id } = req.body

        try {
            const path = await estate.getCertificatePathById(estate_id);

            const storage = new Web3Storage({
                token: config.key.web3storage_token
            })
            let files = []

            const certificates = await getFilesFromPath(config.constant.upload_path);
            for (const index in certificates) {
                if (certificates[index].name.indexOf(path) != -1) {
                    files.push(certificates[index])
                    break;
                }
            }

            console.log(`Uploading ${files.length} file(s)...`);
            const cid = await storage.put(files);
            console.log(`Uploading done: ${cid}`);

            res.send({
                exitcode: 0,
                message: "Upload successfully",
                cid: cid
            })
        } catch (err) {
            console.error(err)
            res.send({
                exitcode: 1,
                message: "Cannot upload to IPFS"
            })
        }
    },

    async getList(req, res) {
        const { register_address, approval, limit, offset } = req.body;
        try {
            const estateList = await estate.getByRegister(register_address, approval, limit, offset);
            res.send({
                exitcode: 0,
                message: "Get list of estate successfully",
                estates: estateList
            })
        } catch (err) {
            console.error(err)
            res.send({
                exitcode: 1,
                message: "Get list of estate failed"
            })
        }
    },

    async getInformation(req, res) {
        const { estate_id } = req.body
        try {
            const result = await estate.getById(estate_id);
            console.log(result)
            return res.send({
                exitcode: 0,
                message: "Get information successfully",
                estate: result
            })
        } catch (err) {
            console.error(err)
            res.send({
                exitcode: 1,
                message: "Cannot get information of estate"
            })
        }
    },

    async acceptRegistry(req, res) {
        const { estate_id, cid, token_id } = req.body;
        try {
            const result = await estate.acceptRegistry(estate_id, token_id, cid);
            res.send({
                exitcode: 0,
                message: "Update estate successfully"
            })
        } catch (err) {
            console.error(err);
            res.send({
                exitcode: 1,
                message: "Cannot update estate registry"
            })
        }
    }
}