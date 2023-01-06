import { Router, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import validationMiddleware from '../middleware/validationMiddleware'
import { createMail, getAllMailsByUserId } from '../services/mail'
import { postMailSchema } from './validationSchemas/mail'

const router = Router()

router.get('/', validationMiddleware, async (req: Request, res: Response) => {
  const userId = Number(res.locals.userId)

  const result = await getAllMailsByUserId(userId)
  if (typeof result === 'string')
    return res.status(400).send({ message: result })
  res.send(result)
})

router.post(
  '/',
  checkSchema(postMailSchema),
  validationMiddleware,
  async (req: Request, res: Response) => {
    const mail = req.body

    const result = await createMail(mail)
    if (typeof result === 'string')
      return res.status(400).send({ message: result })
    res.send(result)
  }
)

export default router
