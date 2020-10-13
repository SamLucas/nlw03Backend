import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import OrphanageModel from '../model/Orphanage'
import OrphanageView from '../views/orphanage'

class Orphanage {

  async create(req: Request, res: Response) {
    const orphanageRepository = getRepository(OrphanageModel)

    const requestImages = req.files as Express.Multer.File[]
    const images = requestImages.map(image => {
      return { path: image.filename }
    })

    const data = {
      name: req.body.name,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      about: req.body.about,
      instructions: req.body.instructions,
      opening_hours: req.body.opening_hours,
      open_on_weekends: req.body.open_on_weekends,
      images
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    })

    await schema.validate(data, {
      abortEarly: false
    })

    const orphanage = orphanageRepository.create(data)

    await orphanageRepository.save(orphanage)

    return res.status(201).json(OrphanageView.render(orphanage))
  }

  async index(req: Request, res: Response) {
    const orphanageRepository = getRepository(OrphanageModel)
    const orphanages = await orphanageRepository.find({
      relations: ['images']
    })
    return res.json(OrphanageView.renderMany(orphanages))
  }

  async show(req: Request, res: Response) {
    const { id } = req.params
    const orphanageRepository = getRepository(OrphanageModel)
    const orphanage = await orphanageRepository.findOneOrFail(id, {
      relations: ['images']
    }).catch(() => null)

    return res.json(
      orphanage !== null ?
        OrphanageView.render(orphanage)
        : {})
  }
}

export default new Orphanage