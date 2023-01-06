import { Schema } from 'express-validator'

export const postMailSchema: Schema = {
  title: {
    in: 'body',
    isString: true,
  },
  body: {
    in: 'body',
    isString: true,
  },
  userId: {
    in: 'body',
    isInt: true,
  },
}
