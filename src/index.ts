import 'dotenv/config'
import express from 'express'
import authRouter from './routers/auth'
import bankRouter from './routers/bank'
import businessRouter from './routers/business'
import jobRouter from './routers/job'
import mailRouter from './routers/mail'
import newspaperRouter from './routers/newspaper'
import userRouter from './routers/user'
import { expressjwt } from 'express-jwt'
import { APP_SECRET } from './constants'
import extractUserIdMiddleware from './middleware/extractUserIdMiddleware'
import cors from 'cors'
import { initScheduledJobs } from './scheduledJobs'

const app = express()
const port = 8080

const unprotectedRoutes = ['/auth/login', '/auth/refresh']

//Middleware
const jwtAuthMiddleware = expressjwt({
  secret: APP_SECRET,
  algorithms: ['HS256'],
})
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
}

initScheduledJobs()

app.use(cors(corsOptions))
app.use(express.json())
app.use(jwtAuthMiddleware.unless({ path: unprotectedRoutes }))

// Routers
app.use('/auth', authRouter)

app.use(extractUserIdMiddleware) // Middleware to extract userID, after auth router

app.use('/bank', bankRouter)
app.use('/business', businessRouter)
app.use('/job', jobRouter)
app.use('/mail', mailRouter)
app.use('/newspaper', newspaperRouter)
app.use('/user', userRouter)

app.use((error: any, req: any, res: any, next: any) => {
  if (error.status == 401) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  return res.status(500).json({ sentry: res.sentry, error: error.toString() })
})

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
