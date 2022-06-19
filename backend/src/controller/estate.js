const Estate = require('models/estate')
const web3storage = require('web3.storage')
const config = require('config/config')

const registry = (req, res) => {
    data = {
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
    Estate.registry(data, (err, result) => {
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
}

const getCount = (req, res) => {
    data = {
        register_address: req.body.register_address || "",
        approval: req.body.approval
    }
    Estate.getCount(data, (err, result) => {
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
}

const uploadCertificate = (req, res) => {
    res.send({
        exitcode: 0,
        message: "Upload file successfully",
        certificatePath: req.body.fileName
    })
}

const uploadIPFS = (req, res) => {
    const data = {
        estate_id: req.body.estate_id
    }
    Estate.getCertificatePath(data, async (err, result) => {
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

        const storage = new web3storage.Web3Storage({
            token: config.constant.web3storage_token
        })
        let files = []

        const certificates = await web3storage.getFilesFromPath(config.constant.upload_path);
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
}

const getList = (req, res) => {
    data = {
        register_address: req.body.register_address || "",
        approval: req.body.approval,
        limit: req.body.limit,
        offset: req.body.offset,
    }
    Estate.getList(data, (err, result) => {
        if (err) {
            res.send({
                exitcode: 1,
                message: err
            })
        }
        if (result) {
            res.send({
                exitcode: 0,
                estates: result.rows
            })
        }
    })
}

const getInformation = (req, res) => {
    data = {
        estate_id: req.body.estate_id
    }
    Estate.getInformation(data, (err, result) => {
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
                estate: rows[0]
            })
        }
    })
}

const acceptRegistry = (req, res) => {
    data = {
        estate_id: req.body.estate_id,
        cid: req.body.cid,
        token_id: req.body.token_id
    }
    Estate.acceptRegistry(data, (err, result) => {
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

module.exports = {
    registry,
    getCount,
    uploadCertificate,
    getList,
    uploadIPFS,
    acceptRegistry,
    getInformation
}