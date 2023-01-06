import { Schema } from 'express-validator'

export const postTransactionSchema: Schema = {
  title: {
    in: 'body',
    isString: true,
  },
  amount: {
    in: 'body',
    isInt: true,
  },
  userId: {
    in: 'body',
    isInt: true,
  },
}
