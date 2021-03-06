import express from 'express'
import cors from 'cors'
import route from '#src/routes/index.routes'
import config from '#src/config/config'
import log from '#src/middlewares/log.mdw'

const app = express()

//==================== Library =======================

// #region middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(log)
app.use(route)
// #endregion middleware

//Start listen
app.listen(config.PORT, () => {
    console.log("Begin listen on port %s...", config.PORT);
})
