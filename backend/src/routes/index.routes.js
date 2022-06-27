import estate from '#src/routes/estate.routes'
import express from 'express'

const router = express.Router()

router.use('/estate', estate)

export default router