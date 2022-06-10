exports.server = {
    port: 8080,
    noTokenUrl: [],
    expTime: 60*60*24,
    secret: 'NPT'
}

exports.database = {
    host: 'localhost',
    user: 'root',
    password: 'Phuc16102001',
    database: 'NPT',
    multipleStatements: true,
    connectionLimit: 3
}

exports.constant = {
    GENDER: {
        MALE: 0,
        FEMALE: 1,
    },
    STATUS: {
        PENDING: 1,
        ACCEPTED: 2,
        DONE: 0
    },
    DEFAULT_COIN: 0
}
