const db = require('../utils/db')

const registry = (data, resultCallback) => {
    const title = data.title;
    const location = data.location;
    const register_address = data.register_address;
    const profit = data.profit;
    const land_area = data.land_area;
    const construction_area = data.construction_area;
    const description = data.description;
    const certificate_path = data.certificate_path;
    const total_supply = data.total_supply;
    console.log(certificate_path)
    db.pool.query(`
        INSERT INTO property(
            id, title, register_address, approval, description, location, land_area, construction_area, profit, certificate_path, total_supply
        ) VALUES(
            DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
        )
    `, [
        title, register_address, 'pending', description, location, land_area, construction_area, profit, certificate_path, total_supply
    ], (err, res) => {
        if (err) {
            console.log(err)
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res)
    })
}

const getCountByApproval = (data, resultCallback) => {
    const register_address = data.register_address;
    const approval = data.approval;

    db.pool.query(`
        SELECT count(*) 
        FROM PROPERTY
        WHERE register_address=$1
        AND approval=$2`, [
        register_address, approval
    ], (err, res) => {
        if (err) {
            console.log(err)
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}

const getCount = (data, resultCallback) => {
    const register_address = data.register_address;
    const approval = data.approval;

    if (approval) {
        getCountByApproval(data);
        return;
    }

    db.pool.query(`
        SELECT count(*) 
        FROM PROPERTY
        WHERE register_address=$1`, [
        register_address
    ], (err, res) => {
        if (err) {
            console.log(err)
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}

const getListByApproval = (data, resultCallback) => {
    const register_address = data.register_address;
    const approval = data.approval;
    const offset = data.offset;
    const limit = data.limit;

    db.pool.query(`
        SELECT * 
        FROM PROPERTY p
        WHERE register_address=$1
        AND approval=$2
        OFFSET $3
        LIMIT $4`, [
        register_address, approval, offset, limit
    ], (err, res) => {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}

const getList = (data, resultCallback) => {
    const register_address = data.register_address;
    const approval = data.approval;
    const offset = data.offset;
    const limit = data.limit;

    if (approval) {
        getListByApproval(data, resultCallback);
        return;
    }

    db.pool.query(`
        SELECT * 
        FROM PROPERTY p
        WHERE register_address=$1
        OFFSET $2
        LIMIT $3`, [
        register_address, offset, limit
    ], (err, res) => {
        if (err) {
            console.error(err)
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}

const getInformation = (data, resultCallback) => {
    const estate_id = data.estate_id;

    db.pool.query(`
        SELECT * 
        FROM property 
        WHERE id=$1
    `, [
        estate_id
    ], (err, res) => {
        if (err) {
            console.log(err)
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}

const getCertificatePath = (data, resultCallback) => {
    const estate_id = data.estate_id;
    console.log(estate_id)
    db.pool.query(`
        SELECT certificate_path
        FROM property
        WHERE id=$1
    `, [
        estate_id
    ], (err, res) => {
        if (err) {
            console.log(err)
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res)
    })
}

module.exports = {
    registry,
    getCount,
    getList,
    getCertificatePath,
    getInformation
}
