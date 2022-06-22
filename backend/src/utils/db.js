import pg from 'pg'
import config from '#src/config/config'
const pool = new pg.Pool(config.database)

export default pool;