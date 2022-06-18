const Estate = require('models/estate')
const config = require('config/config')

const registry = (req, res) => {
    data = {
        title: req.body.title,
        register_address: req.body.register_address,
        location: req.body.location,
        profit: req.body.profit,
        land_area: req.body.land_area,
        construction_area: req.body.construction_area,
        description: req.body.description
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

const getList = (req, res) => {
    data = {
        register_address: req.body.register_address || "",
        approval: req.body.approval,
        limit: req.body.limit,
        offset: req.body.offset,
    }
    console.log(data)
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
        id: req.body.id
    }
    Estate.getInformation(data, (err, result) => {

    })
}

module.exports = {
    registry,
    getCount,
    getList,
    getInformation
}