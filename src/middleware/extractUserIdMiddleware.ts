import { NextFunction, Request, Response } from 'express'
import { APP_SECRET } from '../constants'
import jsonwebtoken from 'jsonwebtoken'

export default function extractUserIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (
    !req.headers.authorization ||
    req.headers.authorization.split(' ')[0] !== 'Bearer'
  )
    return res.status(401).json({ message: 'Unauthorized' })

  const token = req.headers.authorization.split(' ')[1]

  try {
    const decoded = jsonwebtoken.verify(token, APP_SECRET) as { id: number }
    res.locals.userId = decoded.id
    next()
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
}
