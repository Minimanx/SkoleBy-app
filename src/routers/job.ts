import { Router, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import validationMiddleware from '../middleware/validationMiddleware'
import {
  createJobApplication,
  createJobListing,
  getAllJobListings,
  getJobListingById,
} from '../services/job'
import {
  postJobApplicationSchema,
  postJobListingSchema,
} from './validationSchemas/job'
import { validateIdParam } from './validationSchemas/validateIdParam'

const router = Router()

router.get('/', validationMiddleware, async (req: Request, res: Response) => {
  const userId = Number(res.locals.userId)

  const result = await getAllJobListings(userId)
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

    const result = await getJobListingById(id, userId)
    if (typeof result === 'string')
      return res.status(400).send({ message: result })
    res.send(result)
  }
)

router.post(
  '/',
  checkSchema(postJobListingSchema),
  validationMiddleware,
  async (req: Request, res: Response) => {
    const userId = Number(res.locals.userId)
    const jobListing = req.body

    const result = await createJobListing(jobListing, userId)
    if (typeof result === 'string')
      return res.status(400).send({ message: result })
    res.send(result)
  }
)

router.post(
  '/jobApplication',
  checkSchema(postJobApplicationSchema),
  validationMiddleware,
  async (req: Request, res: Response) => {
    const jobApplication = req.body

    const result = await createJobApplication(jobApplication)
    if (typeof result === 'string')
      return res.status(400).send({ message: result })
    res.send(result)
  }
)

export default router
