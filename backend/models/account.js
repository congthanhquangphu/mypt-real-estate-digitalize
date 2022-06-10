const db = require('./../utils/db')

const signup = (data, resultCallback) => {
    const fullname = data.fullname;
    const email = data.email;
    const password = data.password;
    const wallet_address = data.wallet_address;

    db.pool.query('INSERT INTO ACCOUNT(fullname, email, password, wallet_address) VALUES($1, $2, $3, $4)', [
        fullname, email, password, wallet_address
    ], (err, res) => {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}


const login = (data, resultCallback) => {
    const email = data.email;
    const password = data.password;

    db.pool.query('SELECT email FROM ACCOUNT WHERE email=$1 AND password=$2', [
        email, password
    ], (err, res) => {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}

const checkExist = (data, resultCallback) => {
    const email = data.email;

    db.pool.query('SELECT email FROM ACCOUNT WHERE email=$1', [
        email
    ], (err, res) => {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}

const getInformation = (data, resultCallback) => {
    const email = data.email;

    db.pool.query("SELECT fullname, email, wallet_address FROM ACCOUNT WHERE email=$1",[
        email
    ], (err, res) => {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}

module.exports = {
    signup,
    login,
    checkExist,
    getInformation,
}
