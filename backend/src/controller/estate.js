import estate from '#src/models/estate'
import { Web3Storage, getFilesFromPath } from 'web3.storage'
import config from '#src/config/config'

export default {
    registry(req, res) {
        const data = {
            title: req.body.title,
            register_address: req.body.register_address,
            location: req.body.location,
            profit: req.body.profit,
            land_area: req.body.land_area,
            construction_area: req.body.construction_area,
            description: req.body.description,
            total_supply: req.body.total_supply,
            certificate_path: req.body.certificate_path
        }
        estate.registry(data, (err, result) => {
            if (err) {
                res.send({
                    exitcode: 1,
                    message: err
                })
                return;
            }
            res.send({
                exitcode: 0,
                message: "Registry successfully"
            })
        })
    },

    getCount(req, res) {
        const data = {
            register_address: req.body.register_address || "",
            approval: req.body.approval
        }
        estate.getCount(data, (err, result) => {
            if (err) {
                res.send({
                    exitcode: 1,
                    message: err
                })
                return;
            }
            res.send({
                exitcode: 0,
                count: result.rows[0].count,
            })
        })
    },

    uploadCertificate(req, res) {
        res.send({
            exitcode: 0,
            message: "Upload file successfully",
            certificatePath: req.body.fileName
        })
    },

    uploadIPFS(req, res) {
        const data = {
            estate_id: req.body.estate_id
        }
        estate.getCertificatePath(data, async (err, result) => {
            if (err) {
                res.send({
                    exitcode: 1,
                    message: "Cannot upload to IPFS"
                })
                return;
            }

            const { rowCount, rows } = result
            if (rowCount < 1) {
                res.send({
                    exitcode: 101,
                    message: "Estate not found"
                })
                return;
            }

            const { certificate_path } = rows[0]

            const storage = new Web3Storage({
                token: process.env.WEB3STORAGE_TOKEN
            })
            let files = []

            const certificates = await getFilesFromPath(config.constant.upload_path);
            for (const index in certificates) {
                if (certificates[index].name.indexOf(certificate_path) != -1) {
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
        })
    },

    getList(req, res) {
        const data = {
            register_address: req.body.register_address || "",
            approval: req.body.approval,
            limit: req.body.limit,
            offset: req.body.offset,
        }
        estate.getList(data, (err, result) => {
            if (err) {
                res.send({
                    exitcode: 1,
                    message: "Get list of estate failed"
                })
            }
            if (result) {
                res.send({
                    exitcode: 0,
                    message: "Get list of estate successfully",
                    estates: result.rows
                })
            }
        })
    },

    getInformation(req, res) {
        const data = {
            estate_id: req.body.estate_id
        }
        estate.getInformation(data, (err, result) => {
            if (err) {
                res.send({
                    exitcode: 1,
                    message: "Cannot get information of estate"
                })
                return;
            }

            const { rows, rowCount } = result;
            if (rowCount < 1) {
                res.send({
                    exitcode: 101,
                    message: "Estate not found"
                })
            } else {
                res.send({
                    exitcode: 0,
                    message: "Get information successfully",
                    estate: rows[0]
                })
            }
        })
    },

    acceptRegistry(req, res) {
        const data = {
            estate_id: req.body.estate_id,
            cid: req.body.cid,
            token_id: req.body.token_id
        }
        estate.acceptRegistry(data, (err, result) => {
            console.log(result, err)
            if (err) {
                res.send({
                    exitcode: 1,
                    message: "Cannot update estate registry"
                })
                return;
            }

            res.send({
                exitcode: 0,
                message: "Update estate successfully"
            })
        })
    }
}