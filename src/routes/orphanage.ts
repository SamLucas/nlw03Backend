import { Router } from 'express'

import path from 'path'
import multer from 'multer'

import OrphanageController from '../controller/orphanage'

const route = Router()
const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename)
    },
  })
})

route.post('/orphanage', upload.array('images'), OrphanageController.create)
route.get('/orphanage/:id', OrphanageController.show)
route.get('/orphanage', OrphanageController.index)

export default route

