import account from '#src/routes/account'
import estate from '#src/routes/estate'

export default {
    assignRoutes(app) {
        account.assignRoutes(app)
        estate.assignRoutes(app)
    }
}