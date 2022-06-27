import estate from '#src/models/estate.model'
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
            registerAddress: registerAddress,
            location: location,
            profit: profit,
            landArea: landArea,
            constructionArea: constructionArea,
            description: description,
            totalSupply: totalSupply,
            certificatePath: certificatePath,
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

            if (files.length < 1) {
                res.send({
                    exitcode: 401,
                    message: "Certificate not found"
                })
                return;
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
            if (result === null) {
                res.send({
                    exitcode: 401,
                    message: "Estate not found"
                })
                return;
            }
            res.send({
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