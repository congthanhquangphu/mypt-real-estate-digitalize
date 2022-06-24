import dotenv from 'dotenv'
dotenv.config();

const config = {
    DATABASE: {
        host: 'localhost',
        user: 'postgres',
        password: process.env.DATABASE_PASSWORD,
        database: 'mypt',
        port: "5432"
    },
    
    UPLOAD_PATH: "uploads/",
    WEB3STORAGE_TOKEN: process.env.WEB3STORAGE_TOKEN,
    PORT: 8080,
}

export default config;