const jwt = require('jsonwebtoken')
const Account = require('../models/account')
const config = require('../config/config')

const login = (req, res) => {
    data = {
        email: req.body.email,
        password: req.body.password,
    }
    Account.login(data, (err, result) => {
        console.log(result)
        if (err) {
            res.send({
                exitcode: 1,
                token: '',
                message: err
            })
        }
        if (result && result.rows.length > 0) {
            account = result.rows[0]
            payload = {
                email: result.email,
            }
            res.send({
                exitcode: 0,
                token: jwt.sign(payload, config.server.secret, {
                    expiresIn: config.server.expTime
                }),
                message: "Login successfully"
            })
        } else {
            res.send({
                exitcode: 2,
                token: '',
                message: "Incorrect password or username"
            })
        }
    })
}

const signup = (req, res) => {
    data = {
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        wallet_address: req.body.wallet_address
    }
    Account.checkExist(data, (err, result) => {
        if (err) {
            res.send({
                exitcode: 1,
                message: "Cannot create account"
            })
            return;
        }
        if (result) {
            if (result.rows.length != 0) {
                res.send({
                    exitcode: 2,
                    message: "Email has existed"
                }).end();
            } else {
                Account.signup(data, (err, result) => {
                    if (err) {
                        res.send({
                            exitcode: 1,
                            message: "Cannot create account"
                        })
                        return;
                    }

                    if (result) {
                        res.send({
                            exitcode: 0,
                            message: "Create account successfully"
                        })
                    }
                })
            }
        }
    })
}

const getInformation = (req, res) => {
}


module.exports = {
    login,
    signup,
    getInformation
}