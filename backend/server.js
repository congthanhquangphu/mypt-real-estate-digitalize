const   express = require('express')
        app = express()
        route = require('./routes/routes')
        config = require('./config/config')
        cors = require('cors')
        log = require('./log/log')
        auth = require('./auth/auth')

//==================== Library =======================

//#region middleware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(log.logReq)
app.use(auth.auth)
route.assignRoutes(app)

//#endregion middleware

//Start listen
app.listen(config.server.port, () => {
    console.log("Begin listen on port %s...", config.server.port);
})
