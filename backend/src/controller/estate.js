import estate from '#src/models/estate'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import config from '#src/config/config'

export default {

    async registry(req, res) {
        const {
            title,
            registerAddress,
            location,
            profit,
            landArea,
            constructionArea,
            description,
            totalSupply,
            certificatePath
        } = req.body;
        const entity = {
            title: title,
            register_address: registerAddress,
            location: location,
            profit: profit,
            land_area: landArea,
            construction_area: constructionArea,
            description: description,
            total_supply: totalSupply,
            certificate_path: certificatePath,
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
        const { registerAddress, approval } = req.body;
        try {
            const result = await estate.countByRegister(registerAddress, approval)
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
        const { estateId } = req.body

        try {
            const path = await estate.getCertificatePathById(estateId);

            const storage = new Web3Storage({
                token: config.WEB3STORAGE_TOKEN
            })
            let files = []

            const certificates = await getFilesFromPath(config.UPLOAD_PATH);
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
        const { registerAddress, approval, limit, offset } = req.body;
        try {
            const estateList = await estate.getByRegister(registerAddress, approval, limit, offset);
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
        const { estateId } = req.body
        try {
            const result = await estate.getById(estateId);
            const entity = {
                approval: result.approval,
                certificatePath: result.certificate_path,
                constructionArea: result.construction_area,
                description: result.description,
                id: result.id,
                ipfsCid: result.ipfs_cid,
                landArea: result.land_area,
                location: result.location,
                profit: result.profit,
                registerAddress: result.register_address,
                title: result.title,
                tokenId: result.token_id,
                totalSupply: result.total_supply
            }
            res.send({
                exitcode: 0,
                message: "Get information successfully",
                estate: entity
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
        const { estateId, cid, tokenId } = req.body;
        try {
            const result = await estate.acceptRegistry(estateId, tokenId, cid);
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