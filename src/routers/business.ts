import { Router, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import validationMiddleware from '../middleware/validationMiddleware'
import {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
} from '../services/business'
import { postBusinessSchema } from './validationSchemas/business'
import { validateIdParam } from './validationSchemas/validateIdParam'

const router = Router()

router.get('/', validationMiddleware, async (req: Request, res: Response) => {
  const userId = Number(res.locals.userId)
  const result = await getAllBusinesses(userId)
  if (typeof result === 'string')
    return res.status(400).send({ message: result })
  res.send(result)
})

router.get(
  '/:id',
  checkSchema(validateIdParam('id')),
  validationMiddleware,
  async (req: Request, res: Response) => {
    const userId = Number(res.locals.userId)
    const id = Number(req.params.id)

    const result = await getBusinessById(id, userId)
    if (typeof result === 'string')
      return res.status(400).send({ message: result })
    res.send(result)
  }
)

router.post(
  '/',
  checkSchema(postBusinessSchema),
  validationMiddleware,
  async (req: Request, res: Response) => {
    const business = req.body

    const result = await createBusiness(business)
    if (typeof result === 'string')
      return res.status(400).send({ message: result })
    res.send(result)
  }
)

export default router
