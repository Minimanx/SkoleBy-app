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
  description: {
    in: 'body',
    isString: true,
  },
  icon: {
    in: 'body',
    isString: true,
  },
  opensAt: {
    in: 'body',
    isString: true,
  },
  closesAt: {
    in: 'body',
    isString: true,
  },
}
