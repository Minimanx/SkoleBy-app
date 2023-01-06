import { Schema } from 'express-validator'

export const validateIdParam = (nameOfIdParam: string): Schema => {
  return {
    [nameOfIdParam]: {
      in: 'params',
      toInt: true,
      isInt: true,
    },
  }
}
