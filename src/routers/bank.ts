import { Router, Request, Response } from 'express'
import { checkSchema } from 'express-validator'
import validationMiddleware from '../middleware/validationMiddleware'
import { createTransaction, getAllTransactionsByUserId } from '../services/bank'
import { postTransactionSchema } from './validationSchemas/bank'

const router = Router()

router.get(
  '/transactions',
  validationMiddleware,
  async (req: Request, res: Response) => {
    const userId = Number(res.locals.userId)

    const result = await getAllTransactionsByUserId(userId)
    if (typeof result === 'string')
      return res.status(400).send({ message: result })
    res.send(result)
  }
)

router.post(
  '/transaction',
  checkSchema(postTransactionSchema),
  validationMiddleware,
  async (req: Request, res: Response) => {
    const userId = Number(res.locals.userId)
    const transaction = req.body

    const result = await createTransaction(transaction, userId)
    if (typeof result === 'string')
      return res.status(400).send({ message: result })
    res.send(result)
  }
)

export default router
