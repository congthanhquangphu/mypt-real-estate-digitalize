import dotenv from 'dotenv'
dotenv.config();

const config = {
    server: {
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
    },

    database: {
        host: 'localhost',
        user: 'postgres',
        password: process.env.DATABASE_PASSWORD,
        database: 'mypt',
        port: "5432"
    },

    constant: {
        upload_path: "uploads/",
    }
}

export default config;