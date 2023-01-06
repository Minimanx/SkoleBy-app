import { Router, Request, Response } from 'express'
import validationMiddleware from '../middleware/validationMiddleware'
import { getUserByUserId } from '../services/user'

const router = Router()

router.get('/', validationMiddleware, async (req: Request, res: Response) => {
  const userId = Number(res.locals.userId)

  const result = await getUserByUserId(userId)
  if (typeof result === 'string')
    return res.status(400).send({ message: result })
  res.send(result)
})

export default router
