const Estate = require('models/estate')

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

const upload = (req, res) => {
    res.send({
        exitcode: 0,
        message: "Upload file successfully",
        certificatePath: req.body.fileName
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

module.exports = {
    registry,
    getCount,
    upload,
    getList,
    getInformation
}