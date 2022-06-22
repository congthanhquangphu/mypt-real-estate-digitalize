import express from 'express'
import cors from 'cors'
import route from '#src/routes/routes'
import config from '#src/config/config'
import log from '#src/log/log'
// import auth from '#src/auth/auth'

const app = express()

//==================== Library =======================

// #region middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(log)
// app.use(auth.auth)
route.assignRoutes(app)

// #endregion middleware

//Start listen
app.listen(config.server.port, () => {
    console.log("Begin listen on port %s...", config.server.port);
})
