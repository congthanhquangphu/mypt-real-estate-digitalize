require('dotenv').config()

exports.server = {
    port: 8080,
    noTokenUrl: [
        '/account/signup',
        '/account/login',
        '/estate/getCount',
        '/estate/getInformation',
        '/estate/getList'
    ],
    expTime: 60 * 60 * 24,
    secret: 'MYPT'
}

exports.database = {
    host: 'localhost',
    user: 'postgres',
    password: process.env.DATABASE_PASSWORD,
    database: 'mypt',
    port: "5432"
}

exports.constant = {
    upload_path: "uploads/",
}
