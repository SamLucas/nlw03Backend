import { Router } from 'express'

import OrphanageRoutes from './routes/orphanage'

const route = Router()

route.use(OrphanageRoutes)

export default route