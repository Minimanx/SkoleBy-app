import { CookieOptions, Router } from 'express'
import { APP_SECRET, NODE_ENV } from '../constants'
import jsonwebtoken, { SignOptions } from 'jsonwebtoken'
import { login } from '../services/auth'

const router = Router()

type Token = {
  id: number
  role: string
}

const refreshCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: NODE_ENV !== 'development' ? 'none' : 'lax',
  secure: NODE_ENV !== 'development' ? true : false,
  maxAge: 1000 * 60 * 60 * 24 * 7,
}

const accessTokenOptions: SignOptions = {
  expiresIn: '7d',
  algorithm: 'HS256',
}

const refreshTokenOptions: SignOptions = {
  expiresIn: '28d',
  algorithm: 'HS256',
}

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const result = await login(email, password)

  if (typeof result === 'string')
    return res.status(400).json({ message: result })

  const tokenData: Token = {
    id: result.id,
    role: result.role,
  }

  const accessToken = jsonwebtoken.sign(
    tokenData,
    APP_SECRET,
    accessTokenOptions
  )

  const refreshToken = jsonwebtoken.sign(
    tokenData,
    APP_SECRET,
    refreshTokenOptions
  )

  res.cookie('jwt', refreshToken, refreshCookieOptions)

  res.send({ id: result.id, token: accessToken, role: result.role })
})

router.get('/refresh', async (req, res) => {
  if (!req.cookies?.jwt)
    return res.status(401).json({ message: 'Unauthorized' })

  const refreshToken = req.cookies.jwt

  try {
    const decoded = jsonwebtoken.verify(refreshToken, APP_SECRET) as Token

    const tokenData: Token = {
      id: decoded.id,
      role: decoded.role,
    }

    const accessToken = jsonwebtoken.sign(
      tokenData,
      APP_SECRET,
      accessTokenOptions
    )

    const newRefreshToken = jsonwebtoken.sign(
      tokenData,
      APP_SECRET,
      refreshTokenOptions
    )

    res.cookie('jwt', newRefreshToken, refreshCookieOptions)

    res.send({ token: accessToken })
  } catch (err) {
    return res.status(401).send({ message: 'Unauthorized' })
  }
})

export default router
