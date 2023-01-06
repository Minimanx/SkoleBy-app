import { Schema } from 'express-validator'

export const postBusinessSchema: Schema = {
  title: {
    in: 'body',
    isString: true,
  },
  location: {
    in: 'body',
    isString: true,
  },
  userId: {
    in: 'body',
    isInt: true,
  },
}
