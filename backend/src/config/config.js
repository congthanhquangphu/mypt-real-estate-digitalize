import dotenv from 'dotenv'
dotenv.config();

const config = {
    server: {
        port: 8080,
        no_token_url: [
            '/account/signup',
            '/account/login',
            '/estate/getCount',
            '/estate/getInformation',
            '/estate/getList'
        ],
        exp_time: 60 * 60 * 24,
        secret: process.env.JWT_SECRET
    },

    database: {
        host: 'localhost',
        user: 'postgres',
        password: process.env.DATABASE_PASSWORD,
        database: 'mypt',
        port: "5432"
    },

    key: {
        web3storage_token: process.env.WEB3STORAGE_TOKEN,
    },

    constant: {
        upload_path: "uploads/",
    }
}

export default config;