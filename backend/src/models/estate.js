const db = require('../utils/db')

const registry = (data, resultCallback) => {
    const title = data.title;
    const location = data.location;
    const register_address = data.register_address;
    const profit = data.profit;
    const land_area = data.land_area;
    const construction_area = data.construction_area;
    const description = data.description;

    db.pool.query(`
        INSERT INTO property(
            id, title, register_address, approval, description, location, land_area, construction_area, profit
        ) VALUES(
            DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8
        )
    `, [
        title, register_address, false, description, location, land_area, construction_area, profit
    ], (err, res) => {
        if (res) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res)
    })
}

const getCount = (data, resultCallback) => {
    const uploader_address = data.uploader_address;
    const approval = data.approval;

    db.pool.query(`
        SELECT count(*) 
        FROM PROPERTY
        WHERE uploader_address=$1
        AND approval=$2`, [
        uploader_address, approval
    ], (err, res) => {
        if (err) {
            console.log(err)
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}

const getList = (data, resultCallback) => {
    const uploader_address = data.uploader_address;
    const approval = data.approval;
    const offset = data.offset;
    const limit = data.limit;

    db.pool.query(`
        SELECT * 
        FROM PROPERTY p
        WHERE uploader_address=$1
        AND approval=$2
        OFFSET $3
        LIMIT $4`, [
        uploader_address, approval, offset, limit
    ], (err, res) => {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}

const getInformation = (data, resultCallback) => {
    const id = data.id;

    db.pool.query('SELECT (\
        id, \
        title, \
        location, \
        invest_time, \
        profit, \
        total_supply, \
        token_id\
    ) FROM estate_meta WHERE id=$1', [
        id
    ], (err, res) => {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}


module.exports = {
    registry,
    getCount,
    getList,
    getInformation
}
