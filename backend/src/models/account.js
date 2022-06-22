import db from '#src/utils/db'

export default {

    signup(data, resultCallback){
        const fullname = data.fullname;
        const email = data.email;
        const password = data.password;
        const wallet_address = data.wallet_address;
    
        db.query('INSERT INTO ACCOUNT(fullname, email, password, wallet_address) VALUES($1, $2, $3, $4)', [
            fullname, email, password, wallet_address
        ], (err, res) => {
            if (err) {
                resultCallback(err, null);
                return;
            }
            resultCallback(null, res);
        })
    },
    
    
    login(data, resultCallback){
        const email = data.email;
        const password = data.password;
    
        db.query('SELECT email FROM ACCOUNT WHERE email=$1 AND password=$2', [
            email, password
        ], (err, res) => {
            if (err) {
                resultCallback(err, null);
                return;
            }
            resultCallback(null, res);
        })
    },
    
    checkExist(data, resultCallback){
        const email = data.email;
    
        db.query('SELECT email FROM ACCOUNT WHERE email=$1', [
            email
        ], (err, res) => {
            if (err) {
                resultCallback(err, null);
                return;
            }
            resultCallback(null, res);
        })
    },
    
    getInformation(data, resultCallback){
        const email = data.email;
    
        db.query("SELECT fullname, email, wallet_address FROM ACCOUNT WHERE email=$1",[
            email
        ], (err, res) => {
            if (err) {
                resultCallback(err, null);
                return;
            }
            resultCallback(null, res);
        })
    }
}