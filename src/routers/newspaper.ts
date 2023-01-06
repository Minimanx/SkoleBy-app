import { Router, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import validationMiddleware from '../middleware/validationMiddleware'
import { createNewsPost, getAllNewsPosts } from '../services/newspaper'
import { postNewsPostSchema } from './validationSchemas/newspaper'

const router = Router()

router.get('/', validationMiddleware, async (req: Request, res: Response) => {
  const userId = Number(res.locals.userId)

  const result = await getAllNewsPosts(userId)
  if (typeof result === 'string')
    return res.status(400).send({ message: result })
  res.send(result)
})

router.post(
  '/',
  checkSchema(postNewsPostSchema),
  validationMiddleware,
  async (req: Request, res: Response) => {
    const newsPost = req.body

    const result = await createNewsPost(newsPost)
    if (typeof result === 'string')
      return res.status(400).send({ message: result })
    res.send(result)
  }
)

export default router
