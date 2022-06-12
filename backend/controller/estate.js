const Estate = require('../models/estate')
const config = require('../config/config')

const getCount = (req, res) => {
    data = {
        status: req.body.filter || ""
    }
    Estate.getCount(data, (err, result) => {
        if (err) {
            res.send({
                exitcode: 1,
                message: err
            })
        }
        if (result) {
            res.send({
                exitcode: 0,
                count: result.rows[0].count,
            })
        }
    })
}

const getList = (req, res) => {
    data = {
        status: req.body.filter || "    ",
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
        id: req.body.id
    }
    Estate.getInformation(data, (err, result) => {

    })
}

module.exports = {
    getCount,
    getList,
    getInformation
}