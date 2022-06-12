const db = require('./../utils/db')

const getCount = (data, resultCallback) => {
    const status = data.status;

    db.pool.query(`
        SELECT count(*) 
        FROM PROPERTY
        WHERE status=$1`,[
            status
        ], (err, res) => {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    })
}

const getList = (data, resultCallback) => {
    const status = data.status;
    const offset = data.offset;
    const limit = data.limit;
    console.log(status)

    db.pool.query(`
        SELECT * 
        FROM PROPERTY p
        LEFT JOIN PROPERTY_META m
        ON p.id = m.property_id
        WHERE p.status=$1
        OFFSET $2
        LIMIT $3`, [
        status, offset, limit
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
    getCount,
    getList,
    getInformation
}
